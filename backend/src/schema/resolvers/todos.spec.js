const { todoListData } = require("../../data");

const { gql } = require("apollo-server");
const { createTestClient } = require("apollo-server-testing");

const { constructTestServer } = require("../../utils/__utils");

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
    delToDo(id: $id) {
      id
      text
      author {
        name
      }
    }
  }
`;

const ADD_TODO = gql`
  mutation addToDo($text: String!, $authorName: String!) {
    addToDo(text: $text, authorName: $authorName) {
      id
      text
      author {
        name
      }
    }
  }
`;

const UPDATE_TODO = gql`
  mutation updateToDo($id: ID!, $text: String!, $authorName: String!) {
    updateToDo(id: $id, text: $text, authorName: $authorName) {
      id
      text
      author {
        name
      }
    }
  }
`;

let query;
let mutate;

beforeAll(() => {
  const { testServer } = constructTestServer();
  // use the test server to create a query function
  query = createTestClient(testServer).query;
  mutate = createTestClient(testServer).mutate;
});

describe("Querys", () => {
  it("receiving todolist response", async () => {
    await expect(query({ query: GET_TODOS })).resolves.toMatchObject({
      data: {
        todos: todoListData
      }
    });
  });
});

describe("Mutations", () => {
  let newtodo, updatedTodo;
  beforeEach(() => {
    newtodo = {
      text: "Me was added.",
      author: {
        name: "Max Mustermann"
      }
    };

    updatedTodo = {
      id: "2",
      text: "Hello Update.",
      author: {
        name: "Max Mustermann"
      }
    };
  });

  it("delete todo", async () => {
    await expect(
      mutate({ mutation: DEL_TODO, variables: { id: 1 } })
    ).resolves.toMatchObject({
      data: {
        delToDo: todoListData
      }
    });
  });

  it("add todo", async () => {
    await expect(
      mutate({
        mutation: ADD_TODO,
        variables: { text: newtodo.text, authorName: newtodo.author.name }
      })
    ).resolves.toMatchObject({
      data: {
        addToDo: todoListData
      }
    });
  });

  it("update todo", async () => {
    await expect(
      mutate({
        mutation: UPDATE_TODO,
        variables: {
          id: updatedTodo.id,
          text: updatedTodo.text,
          authorName: updatedTodo.author.name
        }
      })
    ).resolves.toMatchObject({
      data: {
        updateToDo: todoListData
      }
    });
  });
});
