import { gql } from "apollo-server";

export const HelloWorldType = gql`
  type Query {
    hello: String
  }
`;
