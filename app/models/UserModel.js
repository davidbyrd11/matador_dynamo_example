module.exports = function (app, config) {

  return app.getModel("Application", true).extend(function(){

  })
  .methods({
    getNumTables: function(callback) {
      var T = this;
      this.db.fetch(function(err){
        callback(err, Object.keys(T.db.tables).length);
      });
    }
  });

};