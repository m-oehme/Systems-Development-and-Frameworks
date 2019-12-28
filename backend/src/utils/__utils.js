import { ApolloServer } from "apollo-server";
import { makeAugmentedSchema } from "neo4j-graphql-js";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "../rules";
import { typeDefs, resolvers } from "../schema";

const schema = makeAugmentedSchema({ typeDefs, resolvers });

const middleware = applyMiddleware(schema, permissions);
/**
 * Integration testing utils
 */
export const constructTestServer = () => {
  const testServer = new ApolloServer({
    schema: middleware
  });

  return { testServer };
};
