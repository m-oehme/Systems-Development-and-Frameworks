const { decodedToken } = require("../../utils/decode");

const { todoListData } = require("../../data");

module.exports.TodoResolver = {
  Todo: {
    author(todo) {
      return todoListData.find(value => {
        return todo.id === value.id;
      }).author;
    }
  },
  Query: {
    todos: (object, params) => {
      const decoded = decodedToken(params.token);
      return todoListData.filter(todo => todo.author.name === decoded.username);
    }
  },
  Mutation: {
    delToDo: (object, params) => {
      const decoded = decodedToken(params.token);
      let index = todoListData.findIndex(todoData => todoData.id === params.id);
      todoListData.splice(index, 1);
      return todoListData.filter(todo => todo.author.name === decoded.username);
    },
    addToDo: (object, params) => {
      const decoded = decodedToken(params.token);
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
    updateToDo: (object, params) => {
      const decoded = decodedToken(params.token);
      let index = todoListData.findIndex(todoData => todoData.id === params.id);
      todoListData[index].text = params.text;
      todoListData[index].author.name = params.authorName;
      return todoListData.filter(todo => todo.author.name === decoded.username);
    }
  }
};
