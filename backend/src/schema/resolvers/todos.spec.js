import { gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import { constructTestServer } from "../../utils/__utils";

import { todoListData } from "../../data";

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

const POST_LOGIN = gql`
  mutation login($username: String) {
    login(username: $username) {
      username
      isLoggedIn
      token
    }
  }
`;

let query;
let mutate;
let token;

beforeAll(async () => {
  const { testServer } = constructTestServer();
  testServer.requestOptions = {
    context() {
      return {
        token: token
      };
    }
  };

  // use the test server to create a query function
  query = createTestClient(testServer).query;
  mutate = createTestClient(testServer).mutate;

  let {
    data: { login }
  } = await mutate({
    mutation: POST_LOGIN,
    variables: {
      username: "Max"
    }
  });
  token = login.token;
});

describe("Querys", () => {
  it("receiving todolist response", async () => {
    let res = await query({
      query: GET_TODOS
    });
    expect(res).toMatchObject({
      data: {
        todos: todoListData.filter(todo => todo.author.name === "Max")
      },
      errors: undefined
    });
  });
});

describe("Mutations", () => {
  let newtodo, updatedTodo;
  beforeEach(() => {
    newtodo = {
      text: "Me was added.",
      author: {
        name: "Max"
      }
    };

    updatedTodo = {
      id: "3",
      text: "Hello Update.",
      author: {
        name: "Max"
      }
    };
  });

  it("delete todo", async () => {
    const list = todoListData.filter(todo => todo.author.name === "Max");
    list.splice(0, 1);
    await expect(
      mutate({ mutation: DEL_TODO, variables: { id: 1, token: token } })
    ).resolves.toMatchObject({
      data: {
        delToDo: list
      },
      errors: undefined
    });
  });

  it("add new todo to database", async () => {
    const list = todoListData.filter(todo => todo.author.name === "Max");
    list.push(newtodo);
    await expect(
      mutate({
        mutation: ADD_TODO,
        variables: {
          text: newtodo.text,
          authorName: newtodo.author.name
        }
      })
    ).resolves.toMatchObject({
      data: {
        addToDo: list
      },
      errors: undefined
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
        updateToDo: todoListData.filter(todo => todo.author.name === "Max")
      },
      errors: undefined
    });
  });
});
