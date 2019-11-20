const { gql } = require("apollo-server");

const typeDefs = gql`

  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    todos: [Todo]
    hello: String
  }

  type Mutation {
    delToDo(id: ID): String
    addToDo(newToDo: Todo): Todo
    updateToDo(updatedToDo: Todo): Todo
  }

  type Todo {
    id: ID
    text: String
    author: Author
  }

  type Author {
    name: String
  }


`;

module.exports.typeDefs = typeDefs;
