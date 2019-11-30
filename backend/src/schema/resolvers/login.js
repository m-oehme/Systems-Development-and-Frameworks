const { AuthenticationError } = require("apollo-server-errors");

const jwt = require("jsonwebtoken");

const { userData } = require("../../data");

module.exports.LoginResolver = {
  Mutation: {
    login: (object, params) => {
      let user = userData.find(user => user.username === params.username);

      if (user !== undefined) {
        let token = jwt.sign(user, "supersecret");
        return {
          token: token,
          username: user.username,
          isLoggedIn: true
        };
      } else {
        throw new AuthenticationError("There is no such user, you fool!");
      }
    },
    signup: (object, params) => {
      let user = userData.find(user => user.username === params.username);

      if (user === undefined) {
        let newUser = {
          username: params.username
        };
        userData.push(newUser);

        let token = jwt.sign(newUser, "supersecret");

        return {
          token: token,
          username: newUser.username,
          isLoggedIn: true
        };
      } else {
        throw new AuthenticationError(
          "Username already taken! There can be only one!"
        );
      }
    }
  }
};
