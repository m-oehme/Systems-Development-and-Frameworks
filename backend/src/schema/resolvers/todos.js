const { decodedToken } = require("../../utils/decode");

const { todoListData } = require("../../data");

const { neo4jgraphql } = require("neo4j-graphql-js");

module.exports.TodoResolver = {
  Query: {
    todos(object, params, ctx, resolveInfo) {
      const decoded = decodedToken(ctx.token);
      params.filter = {
        author: {
          name: decoded.name
        }
      };
      return neo4jgraphql(object, params, ctx, resolveInfo);
    }
  },
  Mutation: {
    delToDo: async (object, params, ctx, resolveInfo) => {
      const decoded = decodedToken(ctx.token);
      params = {
        filter: {
          author: {
            name: decoded.name
          }
        }
      };
      let index = todoListData.findIndex(todoData => todoData.id === params.id);
      todoListData.splice(index, 1);
      return todoListData;
    },
    addToDo: (object, params, ctx, resolveInfo) => {
      const decoded = decodedToken(ctx.token);
      params = {
        filter: {
          author: {
            name: decoded.name
          }
        }
      };

      var maxid = 0;
      todoListData.map(obj => {
        if (obj.id > maxid) maxid = obj.id;
      });

      todoListData.push({
        id: maxid + 1,
        text: params.text,
        author: {
          name: params.authorName
        }
      });
      return todoListData.filter(todo => todo.author.name === decoded.username);
    },
    updateToDo: (object, params, ctx, resolveInfo) => {
      const decoded = decodedToken(ctx.token);
      params = {
        filter: {
          author: {
            name: decoded.name
          }
        }
      };

      let index = todoListData.findIndex(todoData => todoData.id === params.id);
      todoListData[index].text = params.text;
      todoListData[index].author.name = params.authorName;
      return todoListData.filter(todo => todo.author.name === decoded.username);
    }
  }
};
