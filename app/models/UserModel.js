module.exports = function (app, config) {

  return app.getModel("Application", true).extend(function(){
    this.users = this.db.get('users');
  })
  .methods({
    create: function (user, callback) {
      if(user.email === undefined) throw "Users must have emails!";
      user.UserID = user.email;
      this.users.put(user).save(callback);
    },
    find: function (email, callback) {
      var user = this.users.get({"UserID": email});
      user.fetch(function(err, data) {
        if(err) throw err;
        callback(err, data);
      });
    },
    update: function (email, updates, callback) {
      var user = this.users.get({"UserID": email});
      user.update(function(){
        for(var key in updates) {
          var attribute = updates[key];
          this.put(key, attribute);
        }
      }).save(callback);
    },
    destroy: function (email, callback) {
      var user = this.users.get({"UserID": email});
      user.destroy(function(err){
        if(err) throw err;
        callback(err);
      });
    }
  });

};