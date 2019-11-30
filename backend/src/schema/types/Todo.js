const { gql } = require("apollo-server");

module.exports.TodoType = gql`
  type Todo {
    id: ID
    text: String
    author: Author
  }

  type Query {
    todos(token: String): [Todo]
  }

  type Mutation {
    delToDo(id: ID, token: String): [Todo]
    addToDo(text: String!, authorName: String!, token: String): [Todo]
    updateToDo(
      id: ID!
      text: String!
      authorName: String!
      token: String
    ): [Todo]
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
