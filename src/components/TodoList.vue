<template>
  <div>
    <button id="add" @click="addEntry">Add</button>
    <ol>
      <TodoItem
        v-for="todo in todoListData"
        :todo="todo"
        :edit-mode="initialEditMode"
        :key="todo.id"
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
        { id: 1, message: "Foo" },
        { id: 2, message: "Bar" },
        { id: 3, message: "Baz" }
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

<style scoped></style>
