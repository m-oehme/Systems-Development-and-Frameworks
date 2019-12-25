const { NEO4J_USERNAME, NEO4J_PASSWORD } = require("../../utils/config");

const { todoListData, userData } = require("../../data");

const { gql } = require("apollo-server");
const { createTestClient } = require("apollo-server-testing");
const { v1 } = require("neo4j-driver");
const { decodedToken } = require("../../utils/decode");

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

const GET_TODOS_PAGED = gql`
  query {
    todos(first: 1, offset: 1) {
      id
      text
      author {
        name
      }
    }
  }
`;

const GET_TODOS_ORDERED = gql`
  query {
    todos(orderBy: text_asc) {
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

let driver;
let query;
let mutate;
let token;

beforeAll(async () => {
  driver = v1.driver(
    "bolt://localhost:7687",
    v1.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
  );

  const { testServer } = constructTestServer();
  testServer.requestOptions = {
    context() {
      return {
        user: decodedToken(token),
        driver
      };
    }
  };

  // use the test server to create a query function
  query = createTestClient(testServer).query;
  mutate = createTestClient(testServer).mutate;
});
afterAll(async () => {
  await driver.close();
});
describe("Authentication Failed", () => {
  beforeAll(async () => {
    token = "";
  });

  describe("Querys", () => {
    it("requestin todolist with false username", async () => {
      let res = await query({
        query: GET_TODOS
      });
      expect(res.errors[0]).toHaveProperty("message", "Not Authorised!");
    });
  });

  describe("Mutation", () => {
    it("requesting delete todo with false username", async () => {
      let res = await mutate({ mutation: DEL_TODO, variables: { id: 1 } });

      expect(res.errors[0]).toHaveProperty("message", "Not Authorised!");
    });
  });
});
describe("Authentication Successful", () => {
  beforeAll(async () => {
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
        query: GET_TODOS
      });
      expect(res).toMatchObject({
        data: {
          todos: todoListData.filter(todo => todo.author.name === "Max")
        }
      });
    });

    it("receiving orderes todolist response", async () => {
      let res = await query({
        query: GET_TODOS_ORDERED
      });
      expect(res).toMatchObject({
        data: {
          todos: todoListData
            .filter(todo => todo.author.name === "Max")
            .sort((a, b) => {
              if (a.text < b.text) {
                return -1;
              }
              if (a.text > b.text) {
                return 1;
              }
              return 0;
            })
        }
      });
    });

    it("receiving todos between 1 and 2", async () => {
      let res = await query({
        query: GET_TODOS_PAGED
      });
      expect(res).toMatchObject({
        data: {
          todos: todoListData
            .filter(todo => todo.author.name === "Max")
            .slice(1, 2)
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
        mutate({ mutation: DEL_TODO, variables: { id: 1 } })
      ).resolves.toMatchObject({
        data: {
          delToDo: list
        }
      });
    });

    it("add todo", async () => {
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
          updateToDo: todoListData.filter(todo => todo.author.name === "Max")
        }
      });
    });
  });
});
