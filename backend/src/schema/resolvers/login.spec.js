// const { login } = require("../../data");

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

let query;
let mutate;

beforeAll(() => {
  const { testServer } = constructTestServer();
  // use the test server to create a query function
  query = createTestClient(testServer).query;
  mutate = createTestClient(testServer).mutate;
});

describe("Mutations", () => {
  it("receiving token on login", async () => {
    await expect(
      mutate({
        mutation: POST_LOGIN,
        variables: {
          username: "Max"
        }
      })
    ).resolves.toMatchObject({
      data: {
        isLoggedIn: true
      }
    });
  });
});
