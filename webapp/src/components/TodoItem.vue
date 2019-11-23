<template>
  <li class="todo_item">
    <div v-if="!isEditing">
      <div class="todo_message">{{ todo.text }}</div>
      <div class="todo_author">Created by {{ todo.author.name }}</div>
      <div>
        <button id="edit" @click="edit">Edit</button>
        <button id="delete" @click="delToDo">Delete</button>
      </div>
    </div>
    <div v-else>
      <input v-model="temp.text" />
      <div class="todo_author">Created by {{ todo.author.name }}</div>
      <div>
        <button id="save" @click="save">Save</button>
        <button @click="cancel">Cancel</button>
      </div>
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
      if (this.todo.id == null) {
        this.$emit("remove-entry-local");
      }
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
.todo_item {
  padding: 2px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.todo_message {
  margin-right: 16px;
}
.todo_author {
  font-style: italic;
  font-size: 12px;
  padding: 2px;
}
button {
  background: white;
  border: gray 1px solid;
  border-radius: 4px;
  margin: 2px;
  color: gray;
}
button:hover {
  background: gray;
  color: white;
}
</style>
