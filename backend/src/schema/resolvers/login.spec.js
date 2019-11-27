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
        username: "Not A User"
      }
    });
    expect(res.data.login.isLoggedIn).toBeFalsy();
  });
});
