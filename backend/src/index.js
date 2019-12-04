const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers } = require("./schema");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    return {
      token: token || ""
    };
  }
});

// The `listen` method launches a web server.
apolloServer.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
