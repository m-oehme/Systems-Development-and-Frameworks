import { gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import { constructTestServer } from "../../utils/__utils";

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
  describe("given valid login credentials", () => {
    it("responds with token", async () => {
      let res = await mutate({
        mutation: POST_LOGIN,
        variables: {
          username: "Max"
        }
      });
      expect(res.data.login.token).toStrictEqual(expect.any(String));
    });
  });

  describe("given falsy login credentials", () => {
    it("throws AuthenticationError Login Failed", async () => {
      await expect(
        mutate({
          mutation: POST_LOGIN,
          variables: {
            username: "Not A Human connected!"
          }
        })
      ).resolves.toMatchObject({
        data: null,
        errors: [{ message: "There is no such user, you fool!" }]
      });
    });
  });

  describe("given username that is NOT taken", () => {
    it("creates a new user in the database and responds with a token", async () => {
      let res = await mutate({
        mutation: POST_SIGNUP,
        variables: {
          username: "Bob Ross"
        }
      });
      expect(res.data.signup.token).toStrictEqual(expect.any(String));
    });
  });

  describe("user exists in database already", () => {
    it("throw AuthenticationError SignUp failed", async () => {
      let res = await mutate({
        mutation: POST_SIGNUP,
        variables: {
          username: "Max"
        }
      });
      expect(res).toMatchObject({
        data: null,
        errors: [{ message: "Username already taken! There can be only one!" }]
      });
    });
  });
});
