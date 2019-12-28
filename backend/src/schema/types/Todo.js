import { gql } from "apollo-server";

export const TodoType = gql`
  type Todo {
    id: ID
    text: String
    author: User @relation(name: "ASSIGNED", direction: "IN")
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    delToDo(id: ID): [Todo]
    addToDo(text: String!, authorName: String!): [Todo]
    updateToDo(id: ID!, text: String!, authorName: String!): [Todo]
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
