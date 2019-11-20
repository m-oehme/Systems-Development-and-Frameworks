<template>
  <div id="todo_list">
    <div style="display: flow-root">
      <div id="todo_list_title">Todo List</div>
      <button id="add" @click="addEntry">Add New Todo</button>
    </div>
    <ol>
      <TodoItem
        v-for="todo in todoListData"
        :todo="todo"
        :edit-mode="initialEditMode"
        :key="todo.id"
        @delete-entry="deleteEntry"
        @save-entry="saveEntry"
      />
    </ol>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";

export default {
  name: "TodoList",
  components: { TodoItem },
  data() {
    return {
      todoListData: [
        { id: 1, message: "Foo", author: { name: "Max" } },
        { id: 2, message: "Bar", author: { name: "Max" } },
        { id: 3, message: "Baz", author: { name: "Max" } }
      ],
      initialEditMode: false,
      lastID: 3
    };
  },
  methods: {
    addEntry() {
      this.lastID++;
      this.initialEditMode = true;
      this.todoListData.push({
        id: this.lastID,
        message: "New Todo"
      });
    },
    deleteEntry: function(todo) {
      let index = this.todoListData.findIndex(
        todoData => todoData.id === todo.id
      );
      this.todoListData.splice(index, 1);
    },
    saveEntry: function(todo) {
      let index = this.todoListData.findIndex(
        todoData => todoData.id === todo.id
      );
      this.todoListData[index] = todo;
    }
  }
};
</script>

<style scoped>
#todo_list {
  border: gray 1px solid;
  border-radius: 5px;
  padding: 2px;
  display: inline-block;
  min-width: 30rem;
  margin-right: 5%;
  margin-left: 5%;
}
#todo_list ol {
  list-style: none;
  padding-inline-start: 20px;
  padding-inline-end: 20px;
}
#todo_list_title {
  float: left;
  padding: 8px;
  font-size: 18px;
  font-weight: bold;
}
#add {
  float: right;
}
button {
  background: white;
  border: darkgreen 1px solid;
  border-radius: 4px;
  margin: 4px;
  color: darkgreen;
  font-size: 14px;
}
button:hover {
  background: darkgreen;
  color: white;
}
</style>
