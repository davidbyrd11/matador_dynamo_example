module.exports = function (app, config) {
  return app.getModel('Base', true).extend(function () {
    var dynamo = require("dynamo"),
    client = dynamo.createClient({
      accessKeyId: config.aws_key,
      secretAccessKey: config.aws_secret
    });
    this.db = client.get("us-east-1");
  });
};