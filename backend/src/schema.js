const { gql } = require("apollo-server");

const typeDefs = gql`
  type Todo {
    id: ID
    text: String
    author: Author
  }

  type Author {
    name: String
  }

  type Query {
    todos: [Todo]
    hello: String
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

module.exports.typeDefs = typeDefs;
