<template>
  <div id="todo_list">
    <div id="todo_list_head">
      <div id="todo_list_title">Todo List</div>
      <div class="head_right">
        <button id="addTodo" class="bigGreen" @click="addEntry">
          Add New Todo
        </button>
        <div style="font-style: italic">
          Current editor is {{ user.username }}
        </div>
      </div>
    </div>
    <ol>
      <TodoItem
        v-for="todo in this.todoListData"
        :todo="todo"
        :edit-mode="initialEditMode"
        :key="todo.id"
        @delete-entry="deleteEntry"
        @save-entry="saveEntry"
        @remove-entry-local="removeEntryLocal"
      />
    </ol>
  </div>
</template>

<script>
import gql from "graphql-tag";
import TodoItem from "./TodoItem";

export default {
  name: "TodoList",
  components: { TodoItem },
  props: ["user"],
  apollo: {
    todoListData: {
      query: gql`
        query {
          todoListData: todos {
            id
            text
            author {
              name
            }
          }
        }
      `
    }
  },
  data() {
    return {
      initialEditMode: false,
      isEditingAuthor: false
    };
  },
  methods: {
    removeEntryLocal() {
      this.todoListData.splice(this.todoListData.length - 1, 1);
    },
    addEntry() {
      this.initialEditMode = true;
      const newTodo = {
        message: "New Todo",
        author: {
          name: this.user.username
        }
      };
      this.todoListData.push(newTodo);
    },
    deleteEntry: async function(todo) {
      const mutation = gql`
        mutation delToDo($id: ID) {
          delToDo(id: $id) {
            id
            text
            author {
              name
            }
          }
        }
      `;
      const variables = {
        id: todo.id
      };
      const result = await this.$apollo.mutate({
        mutation: mutation,
        variables: variables
      });
      this.todoListData = result.data.delToDo.slice();
    },
    saveEntry: async function(todo) {
      if (todo.id == null) {
        this.initialEditMode = false;

        const mutation = gql`
          mutation addToDo($text: String!, $authorName: String!) {
            addToDo(text: $text, authorName: $authorName) {
              id
              text
              author {
                name
              }
            }
          }
        `;
        const variables = {
          text: todo.text,
          authorName: this.user.username
        };
        const result = await this.$apollo.mutate({
          mutation: mutation,
          variables: variables
        });
        this.todoListData = result.data.addToDo.slice();
      } else {
        const mutation = gql`
          mutation updateToDo($id: ID!, $text: String!, $authorName: String!) {
            updateToDo(id: $id, text: $text, authorName: $authorName) {
              id
              text
              author {
                name
              }
            }
          }
        `;
        const variables = {
          id: todo.id,
          text: todo.text,
          authorName: this.user.username
        };
        const result = await this.$apollo.mutate({
          mutation: mutation,
          variables: variables
        });
        this.todoListData = result.data.updateToDo.slice();
      }
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
