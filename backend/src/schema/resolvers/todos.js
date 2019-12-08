const { decodedToken } = require("../../utils/decode");

const { todoListData } = require("../../data");

const { neo4jgraphql } = require("neo4j-graphql-js");

module.exports.TodoResolver = {
  Todo: {
    author(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo);
    }
  },
  Query: {
    todos(object, params, ctx, resolveInfo) {
      const decoded = decodedToken(ctx.token);
      return neo4jgraphql(object, params, ctx, resolveInfo);
    }
    // TODO: FILTER MUSS NOCH IMPLEMETIERT WERDEN
    // todos: (object, params, context) => {
    //   const decoded = decodedToken(context.token);
    //   return todoListData.filter(todo => todo.author.name === decoded.username);
    // }
  },
  Mutation: {
    delToDo: (object, params, context) => {
      const decoded = decodedToken(context.token);
      let index = todoListData.findIndex(todoData => todoData.id === params.id);
      todoListData.splice(index, 1);
      return todoListData.filter(todo => todo.author.name === decoded.username);
    },
    addToDo: (object, params, context) => {
      const decoded = decodedToken(context.token);
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
    updateToDo: (object, params, context) => {
      const decoded = decodedToken(context.token);
      let index = todoListData.findIndex(todoData => todoData.id === params.id);
      todoListData[index].text = params.text;
      todoListData[index].author.name = params.authorName;
      return todoListData.filter(todo => todo.author.name === decoded.username);
    }
  }
};
