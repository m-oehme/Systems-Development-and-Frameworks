<template>
  <li>
    <div v-if="!isEditing">
      {{ todo.message }}
      <button @click="edit">Edit</button>
      <button @click="delToDo">Delete</button>
    </div>
    <div v-else>
      <input v-model="temp" />
      <button @click="save">Save</button>
      <button @click="cancel">Cancel</button>
    </div>
  </li>
</template>

<script>
export default {
  name: "todo-list",
  props: ["todo", "index"],
  data() {
    return {
      isEditing: false,
      temp: ""
    };
  },
  methods: {
    edit: function() {
      this.temp = this.todo.message;
      this.isEditing = true;
    },
    delToDo: function(todo) {
      this.isEditing = false;
      todo.delete(this.index);
    },
    save: function(todo) {
      this.isEditing = false;
      todo.save(this.temp, this.index);
    },
    cancel: function() {
      this.isEditing = false;
    }
  }
};
</script>

<style scoped></style>
