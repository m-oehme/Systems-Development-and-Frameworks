import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import { NEO4J_USERNAME, NEO4J_PASSWORD } from "./utils/config";
import { makeAugmentedSchema } from "neo4j-graphql-js";
import { v1 } from "neo4j-driver";

const driver = v1.driver(
  "bolt://localhost:7687",
  v1.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);

const schema = makeAugmentedSchema({ typeDefs, resolvers });

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const apolloServer = new ApolloServer({
  // typeDefs,
  schema,
  // resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    return {
      token: token || "",
      driver
    };
  }
});

// The `listen` method launches a web server.
apolloServer.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
