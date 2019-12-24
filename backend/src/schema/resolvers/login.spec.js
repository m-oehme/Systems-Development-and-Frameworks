const { neo4jConfigs } = require("../../utils/config");

const { userData } = require("../../data");

const { gql } = require("apollo-server");
const { createTestClient } = require("apollo-server-testing");
const { v1 } = require("neo4j-driver");

const { constructTestServer } = require("../../utils/__utils");

const POST_LOGIN = gql`
  mutation login($username: String) {
    login(username: $username) {
      isLoggedIn
      token
    }
  }
`;

const POST_SIGNUP = gql`
  mutation signup($username: String) {
    signup(username: $username) {
      username
      isLoggedIn
      token
    }
  }
`;

let mutate;

beforeAll(() => {
  const driver = v1.driver(
    "bolt://localhost:7687",
    v1.auth.basic(neo4jConfigs.NEO4J_USERNAME, neo4jConfigs.NEO4J_PASSWORD)
  );

  const { testServer } = constructTestServer();
  testServer.requestOptions = {
    context() {
      return {
        driver
      };
    }
  };
  mutate = createTestClient(testServer).mutate;
});

describe("Mutations", () => {
  it("receiving token on login", async () => {
    let res = await mutate({
      mutation: POST_LOGIN,
      variables: {
        username: userData[0].username
      }
    });
    expect(res.data.login.isLoggedIn).toBeTruthy();
  });

  it("error wrong username", async () => {
    let res = await mutate({
      mutation: POST_LOGIN,
      variables: {
        username: "Not A Human connected!"
      }
    });
    expect(res).toMatchObject({
      data: null,
      errors: [{ message: "There is no such user, you fool!" }]
    });
  });

  it("signup successful", async () => {
    let res = await mutate({
      mutation: POST_SIGNUP,
      variables: {
        username: "Bob Ross"
      }
    });
    expect(res.data.signup.isLoggedIn).toBeTruthy();
  });

  it("signup existing user", async () => {
    let res = await mutate({
      mutation: POST_SIGNUP,
      variables: {
        username: userData[0].username
      }
    });
    expect(res.data.signup.token).not.toBeNull();
  });
});
