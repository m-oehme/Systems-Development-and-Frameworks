<template>
  <div id="app" class="apollo">
    <div id="grettings">
      {{ message }}
    </div>
    <div v-if="user != null">
      <TodoList :user="this.user" />
      <NewsFeed :user="this.user" />
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
import NewsFeed from "./components/NewsFeed";

export default {
  name: "App",
  components: {
    NewsFeed,
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
      user: null
    };
  },
  methods: {
    setUser(user) {
      this.user = user;
      localStorage.setItem("token", user.token);
    }
  }
};
</script>

<style></style>
