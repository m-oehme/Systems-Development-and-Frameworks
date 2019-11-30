<template>
  <div>
    <button class="bigGreen" @click="login">Login</button>
    <input v-model="username" />
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Login",
  data() {
    return {
      username: ""
    };
  },
  methods: {
    login: function() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation login($username: String) {
              login(username: $username) {
                username
                isLoggedIn
                token
              }
            }
          `,
          variables: {
            username: this.username
          }
        })
        .then(body => {
          this.$emit("set-user", body.data.login);
        });
    }
  }
};
</script>

<style scoped></style>
