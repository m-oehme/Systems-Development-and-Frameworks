const { gql } = require("apollo-server");

module.exports.HelloWorldType = gql`
  type Query {
    hello: String
  }
`;
