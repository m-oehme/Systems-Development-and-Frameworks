import { gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import { constructTestServer } from "../../utils/__utils";
import { NEO4J_USERNAME, NEO4J_PASSWORD } from "../../utils/config";
import { v1 } from "neo4j-driver";
import { decodedToken } from "../../utils/decode";

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

const GET_NEWS = gql`
  query {
    News(orderBy: createdAt_asc) {
      headline
      author
      createdAt
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

const mockNewsData = [
  {
    headline:
      "Lost traveler finally found the exit of Shinjuku Station after 20 years.",
    author: "Max O",
    createdAt: "2019/01/12"
  },
  {
    headline:
      "Researcher found out that Water contains significant amounts of the chemical compound H2O!",
    author: "Vici B",
    createdAt: "2020/01/12"
  },
  {
    headline: "Is Web Development the future? Do you want to know more?",
    author: "Max O",
    createdAt: "2021/01/12"
  }
];

describe("Authentication Successful", () => {
  beforeAll(async () => {
    let res = await mutate({
      mutation: POST_LOGIN,
      variables: {
        username: "Max"
      }
    });
    token = res.data.login.token;
  });

  describe("Querys", () => {
    it("receiving newsfeed response", async () => {
      let res = await query({
        query: GET_NEWS
      });
      expect(res).toMatchObject({
        data: {
          News: mockNewsData
        }
      });
    });
  });
});

describe("Authentication Failed", () => {
  beforeAll(async () => {
    token = "";
  });

  describe("Querys", () => {
    it("throw AuthError when requesting newsfeed", async () => {
      let res = await query({
        query: GET_NEWS
      });
      expect(res.errors[0]).toHaveProperty("message", "Not Authorised!");
    });
  });
});
