import { decodedToken } from "../../utils/decode";
import { todoListData } from "../../data";

export const TodoResolver = {
  Todo: {
    author(todo) {
      return todoListData.find(value => {
        return todo.id === value.id;
      }).author;
    }
  },
  Query: {
    todos: (object, params, context) => {
      const decoded = decodedToken(context.token);
      return todoListData.filter(todo => todo.author.name === decoded.username);
    }
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
