const { mergeTypes, mergeResolvers } = require("merge-graphql-schemas");

/* Here are all the Types!
 * Add to the list.
 *  */
const { TodoType } = require("./types/Todo");
const { AuthorType } = require("./types/Author");
const { HelloWorldType } = require("./types/HelloWorld");
const { LoginType } = require("./types/Login");

const typeDefs = [TodoType, AuthorType, HelloWorldType, LoginType];

module.exports.typeDefs = mergeTypes(typeDefs, { all: true });

/* Here are all the Resolvers!
 * Add to the list.
 *  */
const { TodoResolver } = require("./resolvers/todos");
const { HelloWorldResolver } = require("./resolvers/helloWorld");
const { LoginResolver } = require("./resolvers/login");

const resolversArray = [TodoResolver, HelloWorldResolver, LoginResolver];
module.exports.resolvers = mergeResolvers(resolversArray);
