const { gql } = require("apollo-server");

module.exports.AuthorType = gql`
  type Author {
    name: String
  }
`;
