import { rule, shield } from "graphql-shield";

// Roles
const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx) => {
    return ctx.user !== null;
  }
);

// Permission
export const permissions = shield({
  Query: {
    todos: isAuthenticated
  },
  Mutation: {
    delToDo: isAuthenticated,
    addToDo: isAuthenticated,
    updateToDo: isAuthenticated
  }
});
