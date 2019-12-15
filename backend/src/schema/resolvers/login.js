const { AuthenticationError } = require("apollo-server-errors");

const jwt = require("jsonwebtoken");

module.exports.LoginResolver = {
  Mutation: {
    login: async (object, params, ctx) => {
      const session = ctx.driver.session();
      try {
        const result = await session.run(
          "MATCH (max:User) WHERE max.name = $username return max as user",
          {
            username: params.username
          }
        );
        const [user] = await result.records.map(record => {
          return record.get("user").properties;
        });

        if (user !== undefined) {
          let token = jwt.sign(user.name, "supersecret");
          return {
            token: token,
            username: user.name,
            isLoggedIn: true
          };
        } else {
          throw new AuthenticationError("There is no such user, you fool!");
        }
      } finally {
        await session.close();
      }
    },
    signup: async (object, params, ctx) => {
      const session = ctx.driver.session();
      try {
        const result = await session.run(
          "MERGE (max:User {name:$username}) return max as user",
          {
            username: params.username
          }
        );
        const [user] = await result.records.map(record => {
          return record.get("user").properties;
        });

        if (user !== undefined) {
          let token = jwt.sign(user.name, "supersecret");
          return {
            token: token,
            username: user.name,
            isLoggedIn: true
          };
        } else {
          throw new AuthenticationError(
            "Username already taken! There can be only one!"
          );
        }
      } finally {
        await session.close();
      }
    }
  }
};
