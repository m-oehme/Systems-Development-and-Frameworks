const { gql } = require("apollo-server");

module.exports.AuthorType = gql`
  type User {
    name: String
  }
`;
