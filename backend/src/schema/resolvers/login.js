const { AuthenticationError } = require("apollo-server-errors");

const jwt = require("jsonwebtoken");

const { userData } = require("../../data");

const { neo4jgraphql } = require("neo4j-graphql-js");

module.exports.LoginResolver = {
  Mutation: {
    login: async (object, params, ctx, resolveInfo) => {

      const session = ctx.driver.session()
      try {
        const result = await session.run(
          'MATCH (max:User) WHERE max.name = $username return max as user',
          {
            username: params.username
          }
        )
        const [user] = await result.records.map(record => {
          return record.get('user').properties
        })

        if (user !== undefined) {
          let token = jwt.sign(user, "supersecret");
          return {
            token: token,
            username: user.name,
            isLoggedIn: true
          };
        } else {
          throw new AuthenticationError("There is no such user, you fool!");
        }
      } catch (error) {
        console.log(error)
        // await session.rollback()
        // console.log('rolled back')
      } finally {
        await session.close()
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
