<template>
  <div id="app" class="apollo">
    <div id="grettings">
      {{ message }}
    </div>
    <TodoList />
  </div>
</template>

<script>
import gql from "graphql-tag";
import TodoList from "./components/TodoList";

export default {
  name: "app",
  components: {
    TodoList
  },
  apollo: {
    message: gql`
      query {
        message: hello
      }
    `
  },
  data() {
    return {
      message: "Hello Vue!"
    };
  }
};
</script>

<style></style>
