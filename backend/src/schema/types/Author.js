import { gql } from "apollo-server";

export const AuthorType = gql`
  type Author {
    name: String
  }
`;
