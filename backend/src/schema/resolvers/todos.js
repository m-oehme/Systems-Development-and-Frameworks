import { decodedToken } from "../../utils/decode";
import { todoListData } from "../../data";
import { neo4jgraphql } from "neo4j-graphql-js";

export const TodoResolver = {
  Query: {
    todos(object, params, ctx, resolveInfo) {
      const decoded = decodedToken(ctx.token);
      params.filter = {
        author: {
          name: decoded
        }
      };
      return neo4jgraphql(object, params, ctx, resolveInfo);
    }
  },
  Mutation: {
    delToDo: async (object, params, ctx) => {
      const decoded = decodedToken(ctx.token);
      let index = todoListData.findIndex(todoData => todoData.id === params.id);
      todoListData.splice(index, 1);
      return todoListData.filter(todo => todo.author.name === decoded);
    },
    addToDo: (object, params, ctx) => {
      const decoded = decodedToken(ctx.token);
      const maxid = todoListData.reduce((previousValue, currentValue) =>
        Math.max(previousValue.id, currentValue.id)
      );

      todoListData.push({
        id: (maxid + 1).toString(),
        text: params.text,
        author: {
          name: params.authorName
        }
      });
      return todoListData.filter(todo => todo.author.name === decoded);
    },
    updateToDo: (object, params, ctx) => {
      const decoded = decodedToken(ctx.token);

      let index = todoListData.findIndex(todoData => todoData.id === params.id);
      todoListData[index].text = params.text;
      todoListData[index].author.name = params.authorName;
      return todoListData.filter(todo => todo.author.name === decoded);
    }
  }
};
