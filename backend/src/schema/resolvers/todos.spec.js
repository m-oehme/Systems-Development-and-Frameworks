const { todoListData, userData } = require("../../data");

const { gql } = require("apollo-server");
const { createTestClient } = require("apollo-server-testing");

const { constructTestServer } = require("../../utils/__utils");

const GET_TODOS = gql`
  query($token: String) {
    todos(token: $token) {
      id
      text
      author {
        name
      }
    }
  }
`;

const DEL_TODO = gql`
  mutation delToDo($id: ID, $token: String) {
    delToDo(id: $id, token: $token) {
      id
      text
      author {
        name
      }
    }
  }
`;

const ADD_TODO = gql`
  mutation addToDo($text: String!, $authorName: String!, $token: String) {
    addToDo(text: $text, authorName: $authorName, token: $token) {
      id
      text
      author {
        name
      }
    }
  }
`;

const UPDATE_TODO = gql`
  mutation updateToDo(
    $id: ID!
    $text: String!
    $authorName: String!
    $token: String
  ) {
    updateToDo(id: $id, text: $text, authorName: $authorName, token: $token) {
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
  // use the test server to create a query function
  query = createTestClient(testServer).query;
  mutate = createTestClient(testServer).mutate;

  let res = await mutate({
    mutation: POST_LOGIN,
    variables: {
      username: userData[0].username
    }
  });
  token = res.data.login.token;
});

describe("Querys", () => {
  it("receiving todolist response", async () => {
    let res = await query({
      query: GET_TODOS,
      variables: {
        token: token
      }
    });
    expect(res).toMatchObject({
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
      mutate({ mutation: DEL_TODO, variables: { id: 1, token: token } })
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
        variables: {
          text: newtodo.text,
          authorName: newtodo.author.name,
          token: token
        }
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
          authorName: updatedTodo.author.name,
          token: token
        }
      })
    ).resolves.toMatchObject({
      data: {
        updateToDo: todoListData
      }
    });
  });
});
