import { gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import { constructTestServer } from "../../utils/__utils";
import { hello } from "../../data";

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
