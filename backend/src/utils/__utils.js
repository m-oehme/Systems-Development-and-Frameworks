import { ApolloServer } from "apollo-server";
import { makeAugmentedSchema } from "neo4j-graphql-js";

import { typeDefs, resolvers } from "../schema";

const schema = makeAugmentedSchema({ typeDefs, resolvers });

/**
 * Integration testing utils
 */
export const constructTestServer = () => {
  const testServer = new ApolloServer({
    schema
  });

  return { testServer };
};
