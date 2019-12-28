import { hello } from "../../data";

export const HelloWorldResolver = {
  Query: {
    hello: () => hello
  }
};
