<template>
  <div id="todo_list">
    <div id="todo_list_head">
      <div id="todo_list_title">Todo List</div>
      <div v-if="!isEditingAuthor" class="head_right">
        <button class="bigGreen" @click="addEntry">Add New Todo</button>
        <div style="font-style: italic">
          Current editor is {{ author.name }}
        </div>
        <button class="smallGray" @click="editAuthor">Edit</button>
      </div>
      <div v-else class="head_right">
        <button class="bigGreen" @click="saveAuthor">Save Author</button>
        <input v-model="author.name" />
      </div>
    </div>
    <ol>
      <TodoItem
        v-for="todo in todoListData"
        :todo="todo"
        :edit-mode="initialEditMode"
        :key="todo.id"
        @delete-entry="deleteEntry"
        @save-entry="saveEntry"
      />
    </ol>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";

export default {
  name: "TodoList",
  components: { TodoItem },
  data() {
    return {
      todoListData: [
        { id: 1, message: "Foo", author: { name: "Max" } },
        { id: 2, message: "Bar", author: { name: "Max" } },
        { id: 3, message: "Baz", author: { name: "Max" } }
      ],
      initialEditMode: false,
      author: { name: "Max" },
      isEditingAuthor: false,
      lastID: 3
    };
  },
  methods: {
    addEntry() {
      this.lastID++;
      this.initialEditMode = true;
      this.todoListData.push({
        id: this.lastID,
        message: "New Todo"
      });
    },
    deleteEntry: function(todo) {
      let index = this.todoListData.findIndex(
        todoData => todoData.id === todo.id
      );
      this.todoListData.splice(index, 1);
    },
    saveEntry: function(todo) {
      let index = this.todoListData.findIndex(
        todoData => todoData.id === todo.id
      );
      this.todoListData[index] = todo;
    },
    editAuthor() {
      this.isEditingAuthor = true;
    },
    saveAuthor() {
      this.isEditingAuthor = false;
    }
  }
};
</script>

<style scoped>
#todo_list {
  border: gray 1px solid;
  border-radius: 5px;
  padding: 2px;
  display: inline-block;
  min-width: 30rem;
  margin-right: 5%;
  margin-left: 5%;
}
#todo_list ol {
  list-style: none;
  padding-inline-start: 20px;
  padding-inline-end: 20px;
}
#todo_list_title {
  float: left;
  padding: 8px;
  font-size: 18px;
  font-weight: bold;
}
.head_right {
  float: right;
}
#todo_list_head {
  display: flow-root;
}
.head_right > * {
  display: block;
}
button.bigGreen {
  background: white;
  border: darkgreen 1px solid;
  border-radius: 4px;
  margin: 4px;
  color: darkgreen;
  font-size: 14px;
}
button.bigGreen:hover {
  background: darkgreen;
  color: white;
}
button.smallGray {
  background: white;
  border: gray 1px solid;
  border-radius: 4px;
  margin: 2px;
  color: gray;
  font-size: 12px;
}
button.smallGray:hover {
  background: gray;
  color: white;
}
</style>
