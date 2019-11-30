const { userData } = require("../../data");

const { gql } = require("apollo-server");
const { createTestClient } = require("apollo-server-testing");

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
  const { testServer } = constructTestServer();
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

  it("signup failed", async () => {
    let res = await mutate({
      mutation: POST_SIGNUP,
      variables: {
        username: userData[0].username
      }
    });
    expect(res).toMatchObject({
      data: null,
      errors: [{ message: "Username already taken! There can be only one!" }]
    });
  });
});
