const { gql } = require("apollo-server");

module.exports.TodoType = gql`
  type Todo {
    id: ID
    text: String
    author: User @relation(name: "ASSIGNED", direction: "IN")
  }

  type Query {
    todos(orderBy:[_TodoOrdering] = asc): [Todo]
  }

  type Mutation {
    delToDo(id: ID): [Todo]
    addToDo(text: String!, authorName: String!): [Todo]
    updateToDo(id: ID!, text: String!, authorName: String!): [Todo]
  }
  
`;
