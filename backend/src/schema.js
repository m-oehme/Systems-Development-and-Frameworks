const { gql } = require("apollo-server");

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # This is an example on how to do a schema for todolist. Author is not requireed!
  type Todo {
    message: String
    author: Author
  }

  type Author {
    name: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    todos: [Todo]
    books: [Book]
    hello: String
  }
`;

module.exports.typeDefs = typeDefs;
