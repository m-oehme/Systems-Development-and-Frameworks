const { NEO4J_USERNAME = "neo4j", NEO4J_PASSWORD = "neo4j" } = process.env;

module.exports.neo4jConfigs = { NEO4J_USERNAME, NEO4J_PASSWORD };
