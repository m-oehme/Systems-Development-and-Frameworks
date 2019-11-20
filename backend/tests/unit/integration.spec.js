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
  let query;
  beforeEach ( () => {
    const { testServer } = constructTestServer();
    // use the test server to create a query function
    query = createTestClient(testServer);
  });

  it("receiving hello world message", async () => {
    const res = await query({ query: GET_HELLO, variables: { id: 1 } });
    expect(res).toMatchSnapshot();
  });

  it("receiving todolist response", async () => {
    const res = await query({ query: GET_TODOS });
    expect(res).toMatchSnapshot();
  });

});

describe("Mutations", () => {
  let query;
  beforeEach ( () => {
    const { testServer } = constructTestServer();
    // use the test server to create a query function
    query = createTestClient(testServer);
  });


  it("delete todo", async () => {
    const res = await query({ query: DEL_TODO, variables: { id: 1 } });
    expect(res).toMatchSnapshot();
  });

  it("add todo", async () => {
    let todo = {
      id: 5,
      message: "Me was added.",
      author: {
        name: "Max Mustermann"
      }
    }
    const res = await query({ query: ADD_TODO, variables: { newToDo: todo } });
    expect(res).toMatchSnapshot();
  });

  it("update todo", async () => {
    let todo = {
      id: 1,
      message: "Hello Update.",
      author: {
        name: "Max Mustermann"
      }
    }
    const res = await query({ query: UPDATE_TODO, variables: { update: todo }});
    expect(res).toMatchSnapshot();
  });
});
