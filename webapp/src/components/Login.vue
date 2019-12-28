<template>
  <div>
    <button class="bigGreen" @click="login">Login</button>
    <button class="bigGreen" @click="signup">SignUp</button>
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
    login: async function() {
      const mutation = gql`
        mutation login($username: String) {
          login(username: $username) {
            username
            token
          }
        }
      `;
      const variables = {
        username: this.username
      };
      const result = await this.$apollo.mutate({
        mutation: mutation,
        variables: variables
      });
      this.$emit("set-user", result.data.login);
    },
    signup: async function() {
      const mutation = gql`
        mutation signup($username: String) {
          signup(username: $username) {
            username
            token
          }
        }
      `;
      const variables = {
        username: this.username
      };
      const result = await this.$apollo.mutate({
        mutation: mutation,
        variables: variables
      });
      this.$emit("set-user", result.data.signup);
    }
  }
};
</script>

<style scoped></style>
