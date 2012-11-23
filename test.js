module.exports = function (app, config) {
  console.log('Torero is testing the strength of the bull ...');
  var assert = require('assert'),
      async = require('async'),
      updates = {name: "David Michael Byrd"},
      mock_user = {
    "name": "David Byrd",
    "email": "david@byrdhou.se",
    "twitter": "davidbyrd11",
    "address": "123 Happy St. New York, NY 10003 Apt 99999",
    "access": "admin"
  };
  async.series([
    function (cback){
      app.getModel("User", false).create(mock_user, function(err){
        assert(err === undefined, "User created successfully");
        if(err) throw err;
        cback(null);
      });
    },
    function (cback) {
      app.getModel("User", false).find(mock_user.email, function(err, retrieved_user){
        if(err) throw err;
        assert(retrieved_user.UserID === mock_user.email, 'UserID is correct');
        assert(retrieved_user.UserID === retrieved_user.email, 'UserID is the user\'s email');
        assert(retrieved_user.name === mock_user.name, 'name is correct');
        assert(retrieved_user.address === mock_user.address, 'address is correct');
        assert(retrieved_user.twitter === mock_user.twitter, 'twitter handle is correct');
        assert(retrieved_user.access  === mock_user.access, 'access is correct');
        assert(retrieved_user.email === mock_user.email, 'email is correct');
        cback(null);
      });
    },
    function (cback) {
      app.getModel("User", false).update(mock_user.email, updates, function(err){
        if(err) throw err;
        cback(null);
      });
      
    },
    function (cback) {
      app.getModel("User", false).find(mock_user.email, function(err, updated_user){
        if(err) throw err;
        cback(null);
        assert(updated_user.name === updates.name, "User was properly updated");
      });
    },
    function (cback) {
      app.getModel("User", false).destroy(mock_user.email, function(err){
        if(err) throw err;
        cback(null);
      });
    }],
    function (err, results) {
      if(err) throw err;
    });
};