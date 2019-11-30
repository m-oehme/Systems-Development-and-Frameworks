<template>
  <div id="app" class="apollo">
    <div id="grettings">
      {{ message }}
    </div>
    <div v-if="user != null">
      <TodoList :user="this.user" />
    </div>
    <div v-else>
      <Login @set-user="setUser" />
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import TodoList from "./components/TodoList";
import Login from "./components/Login";

export default {
  name: "app",
  components: {
    Login,
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
      message: "Hello Vue!",
      isLoggedIn: false,
      user: null
    };
  },
  methods: {
    setUser(user) {
      this.user = user;
    }
  }
};
</script>

<style></style>
