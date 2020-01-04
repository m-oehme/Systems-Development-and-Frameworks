import { neo4jgraphql } from "neo4j-graphql-js";

export const NewsResolver = {
  Query: {
    News(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo);
    }
  }
};
