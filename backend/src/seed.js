const { NEO4J_USERNAME, NEO4J_PASSWORD } = require("./utils/config");
const { v1 } = require("neo4j-driver");
const driver = v1.driver(
  "bolt://localhost:7687",
  v1.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);

(async function() {
  const session = driver.session();
  try {
    await session.run(
      `
            CREATE( max:User { name:'Max' })
            CREATE( vic:User { name:'Victor' })
            
            CREATE( todo1:Todo { id: 1, text: 'Foo' })
            CREATE( todo2:Todo { id: 2, text: 'Bar' })
            CREATE( todo3:Todo { id: 3, text: 'Baz' })
            
            CREATE
            (max)-[:ASSIGNED]->(todo1),
            (max)-[:ASSIGNED]->(todo3),
            (vic)-[:ASSIGNED]->(todo2)
            `
    );

    console.log("Seeded Data...");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await session.close();

    process.exit(0);
  }
})();
