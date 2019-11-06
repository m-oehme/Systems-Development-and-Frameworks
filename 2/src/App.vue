<template>
  <div id="app">
    <div>
      {{ message }}
      <button @click="add">Add</button>
    </div>
    <ol>
      <todo-list
        v-for="(todo, index) in todos"
        :todo="todo"
        :index="index"
        :key="todo.id"
      ></todo-list>
    </ol>
  </div>
</template>

<script>
import TodoList from "./components/TodoList";
export default {
  name: "app",
  data: {
    message: "Hello Vue!",
    todos: [
      { id: 1, message: "Foo" },
      { id: 2, message: "Bar" },
      { id: 3, message: "Baz" }
    ],
    lastID: 3
  },
  methods: {
    add: function() {
      this.lastID++;
      // this.todos.length++;
      this.todos.push({
        id: this.lastID,
        message: "New ToDo"
      });
    },
    delete: function(index) {
      this.todos.splice(index, 1);
    },
    save: function(msg, index) {
      this.todos[index].message = msg;
    }
  }
};
</script>

<style scoped></style>
