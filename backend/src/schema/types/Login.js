import { gql } from "apollo-server";

export const LoginType = gql`
  type Login {
    username: String
    token: String
    isLoggedIn: Boolean
  }

  type Mutation {
    login(username: String): Login!
    signup(username: String): Login!
  }

  schema {
    mutation: Mutation
  }
`;
