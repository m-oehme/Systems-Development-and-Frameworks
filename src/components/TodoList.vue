<template>
  <div>
    <button @click="addEntry">Add</button>
    <ol>
      <TodoItem
              v-for="(todo, index) in todoListData"
              :todo="todo"
              :index="index"
              :key="todo.id"
      />
    </ol>
  </div>
</template>

<script>
  import TodoItem from "./TodoItem";

  export default {
    name: "TodoList",
    components: {TodoItem},
    data() {
      return {
        todoListData: [
          {id: 1, message: "Foo"},
          {id: 2, message: "Bar"},
          {id: 3, message: "Baz"}
        ],
        lastID: 3
      }
    },
    methods: {
      addEntry: function () {
        this.lastID++;
        this.todoListData.push({
          id: this.lastID,
          message: "New ToDo"
        });
      },
      deleteEntry: function (index) {
        this.todoListData.splice(index, 1);
      },
      saveEntry: function (msg, index) {
        this.todoListData[index].message = msg;
      }
    }
  };
</script>

<style scoped></style>
