// const { HttpLink } = require('apollo-link-http');
// const fetch = require('node-fetch');
const { ApolloServer, gql } = require("apollo-server");
const { HttpLink, execute, toPromise } = require("apollo-server-testing");

module.exports.toPromise = toPromise;

const { typeDefs } = require("../../src/schema");
const { resolvers } = require("../../src/resolver");

/**
 * Integration testing utils
 */
const constructTestServer = () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers
  });

  return { testServer };
};

module.exports.constructTestServer = constructTestServer;

/**
 * e2e Testing Utils
 */

const startTestServer = async testServer => {
  // if using apollo-server-express...
  // const app = express();
  // server.applyMiddleware({ app });
  // const httpServer = await app.listen(0);

  const httpServer = await testServer.listen({ port: 0 });

  const link = new HttpLink({
    uri: `http://localhost:${httpServer.port}`,
    fetch
  });

  const executeOperation = ({ query, variables = {} }) =>
    execute(link, { query, variables });

  return {
    link,
    stop: () => httpServer.server.close(),
    graphql: executeOperation
  };
};

module.exports.startTestServer = startTestServer;
