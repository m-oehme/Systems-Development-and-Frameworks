import { gql } from "apollo-server";

export const NewsType = gql`
  type News {
    headline: String
    author: String
    createdAt: String
  }

  type Query {
    News: [News]
  }

  schema {
    query: Query
  }
`;
