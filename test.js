module.exports = function (app, config) {
  console.log('Torero is testing the strength of the bull ...');
  var assert = require('assert');

  app.getModel("User", false).getNumTables(function(err, num){
    assert(num === 5, "There are 5 tables");
  });

};