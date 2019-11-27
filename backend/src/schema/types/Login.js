const { gql } = require("apollo-server");

module.exports.LoginType = gql`
  type Login {
    username: String
    token: String
    isLoggedIn: Boolean
  }

  type Mutation {
    login(username: String): Login
  }

  schema {
    mutation: Mutation
  }
`;
