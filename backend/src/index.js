const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers } = require("./schema");
const { permissions } = require("./rules");
const { makeAugmentedSchema } = require("neo4j-graphql-js");
const { v1 } = require("neo4j-driver");
const { decodedToken } = require("./utils/decode");
const { applyMiddleware } = require("graphql-middleware");

const driver = v1.driver(
  "bolt://localhost:7687",
  v1.auth.basic("neo4j", "password")
);

const schema = makeAugmentedSchema({ typeDefs, resolvers });

const middleware = applyMiddleware(schema, permissions);

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const apolloServer = new ApolloServer({
  schema: middleware,
  context: ({ req }) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    return {
      user: decodedToken(token),
      driver
    };
  }
});

// The `listen` method launches a web server.
apolloServer.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
