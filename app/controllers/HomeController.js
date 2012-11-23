module.exports = function (app, config) {
  return app.getController("Application", true).extend()
  .methods({
    index: function (req, res) {
      var data = {
        title: 'The Torero Framework'
      };
      this.render(res, 'index', data);
    }
  });
};
