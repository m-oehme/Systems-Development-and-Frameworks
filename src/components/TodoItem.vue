<template>
  <li>
    <div v-if="!isEditing">
      {{ todo.message }}
      <button id="edit" @click="edit">Edit</button>
      <button id="delete" @click="delToDo">Delete</button>
    </div>
    <div v-else>
      <input v-model="temp.message" />
      <button id="save" @click="save">Save</button>
      <button @click="cancel">Cancel</button>
    </div>
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todo", "editMode"],
  data() {
    return {
      isEditing: this.editMode,
      temp: this.todo
    };
  },
  methods: {
    edit: function() {
      this.temp = this.todo;
      this.isEditing = true;
    },
    delToDo: function() {
      this.isEditing = false;
      this.$emit("delete-entry", this.todo);
    },
    save: function() {
      this.isEditing = false;
      this.todo = this.temp;
      this.$emit("save-entry", this.todo);
    },
    cancel: function() {
      this.isEditing = false;
    }
  }
};
</script>

<style scoped></style>
