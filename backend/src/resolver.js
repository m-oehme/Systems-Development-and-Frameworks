const { todoListData, hello } = require("./data");

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    hello: () => hello,
    todos: () => todoListData
  },

  Mutation: {
    delToDo: (object, params) => {
      let index = todoListData.findIndex(todoData => todoData.id === params.id);
      todoListData.splice(index, 1);
      return todoListData;
    },
    addToDo: (object, params) => {
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
      return todoListData;
    },
    updateToDo: (object, params) => {
      let index = todoListData.findIndex(todoData => todoData.id === params.id);
      todoListData[index].text = params.text;
      todoListData[index].author.name = params.authorName;
      return todoListData;
    }
  },

  Todo: {
    author(todo) {
      return todoListData.find(value => {
        return todo.id === value.id;
      }).author;
    }
  }
};

module.exports.resolvers = resolvers;
