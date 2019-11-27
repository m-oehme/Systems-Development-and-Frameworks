const { hello } = require("../../data");

module.exports.HelloWorldResolver = {
  Query: {
    hello: () => hello
  }
};
