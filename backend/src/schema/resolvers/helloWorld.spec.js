const { hello } = require("../../data");

const { gql } = require("apollo-server");
const { createTestClient } = require("apollo-server-testing");

const { constructTestServer } = require("../../utils/__utils");

const GET_HELLO = gql`
  query {
    message: hello
  }
`;

let query;

beforeAll(() => {
  const { testServer } = constructTestServer();
  // use the test server to create a query function
  query = createTestClient(testServer).query;
});

describe("Querys", () => {
  it("receiving hello world message", async () => {
    await expect(query({ query: GET_HELLO })).resolves.toMatchObject({
      data: {
        message: hello
      },
      errors: undefined
    });
  });
});
