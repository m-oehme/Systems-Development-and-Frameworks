<template>
  <div id="app">
    <div>
      {{ message }}
    </div>
    <TodoList />
  </div>
</template>

<script>
import TodoList from "./components/TodoList";

export default {
  name: 'app',
  components: {
    TodoList
  },
  data() {
    return {
      message: "Hello Vue!",
    }
  }
}
</script>

<style>
</style>
