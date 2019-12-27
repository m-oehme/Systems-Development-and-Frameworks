import { ApolloServer } from "apollo-server";

import { typeDefs, resolvers } from "../schema";

/**
 * Integration testing utils
 */
export const constructTestServer = () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers
  });

  return { testServer };
};
