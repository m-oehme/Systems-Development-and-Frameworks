import { v1 } from "neo4j-driver";
import { NEO4J_USERNAME, NEO4J_PASSWORD } from "./utils/config";

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
            
            CREATE(:News {headline: 'Researcher found out that Water contains significant amounts of the chemical compound H2O!', author: 'Vici B', createdAt: '2020/01/12'})
            CREATE(:News {headline: 'Lost traveler finally found the exit of Shinjuku Station after 20 years.', author: 'Max O', createdAt: '2019/01/12'})
            CREATE(:News {headline: 'Is Web Development the future? Do you want to know more?', author: 'Max O', createdAt: '2021/01/12'})
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
