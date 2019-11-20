const { gql } = require("apollo-server");
const { createTestClient } = require("apollo-server-testing");

const { constructTestServer } = require("./__utils");

const GET_HELLO = gql`
  query {
    message: hello
  }
`;

const GET_TODOS = gql`
  query {
    todos {
        id
        text
        author {
          name
        }
    }
  }
`;


const DEL_TODO = gql`
  mutation delToDo($id: ID) {
    delToDo(id = $id)
  }
`;

const ADD_TODO = gql`
  mutation addToDo($todo: TODO) {
    addToDo(newToDo = $todo) {
      id 
      text
      author {
        name
      }
    }
  }
`;

const UPDATE_TODO = gql`
  mutation updateToDo($update: TODO) {
    updateToDo(updatedToDo = $update) {
      id 
      text
      author {
        name
    }
  }
`;

describe("Querys", () => {
  it("receiving hello world message", async () => {
    const { testServer } = constructTestServer();

    // use the test server to create a query function
    const { query } = createTestClient(testServer);

    const res = await query({ query: GET_HELLO, variables: { id: 1 } });
    expect(res).toMatchSnapshot();
  });

  it.todo("receiving todolist response");
});

describe("Mutations", () => {
  it.todo("delete todo");
  it.todo("add todo");
  it.todo("update todo");
});
