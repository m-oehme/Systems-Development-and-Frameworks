import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { NewsType } from "./types/News";
import { NewsResolver } from "./resolvers/news";

/* Here are all the Types!
 * Add to the list.
 *  */
const { TodoType } = require("./types/Todo");
const { AuthorType } = require("./types/User");
const { HelloWorldType } = require("./types/HelloWorld");
const { LoginType } = require("./types/Login");

const typeDefsList = [
  NewsType,
  TodoType,
  AuthorType,
  HelloWorldType,
  LoginType
];

export const typeDefs = mergeTypes(typeDefsList, { all: true });

/* Here are all the Resolvers!
 * Add to the list.
 *  */
const { TodoResolver } = require("./resolvers/todos");
const { HelloWorldResolver } = require("./resolvers/helloWorld");
const { LoginResolver } = require("./resolvers/login");

const resolversArray = [
  NewsResolver,
  TodoResolver,
  HelloWorldResolver,
  LoginResolver
];
export const resolvers = mergeResolvers(resolversArray);
