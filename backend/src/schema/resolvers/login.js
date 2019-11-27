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
        return {
          token: null,
          username: null,
          isLoggedIn: false
        };
      }
    }
  }
};
