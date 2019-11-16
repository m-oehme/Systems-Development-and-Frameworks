const { gql } = require("apollo-server");
const { createTestClient } = require("apollo-server-testing");

const { constructTestServer } = require("./__utils");

const GET_HELLO = gql`
  query {
    message: hello
  }
`;

// const GET_TODOS = gql`
//     query {
//         todo: todo
//     }
// `;

describe("Testing Querys", () => {
  it("receiving hello world message", async () => {
    const { testServer } = constructTestServer();

    // use the test server to create a query function
    const { query } = createTestClient(testServer);

    const res = await query({ query: GET_HELLO, variables: { id: 1 } });
    expect(res).toMatchSnapshot();
  });

  it.todo("receiving todolist response");
});
