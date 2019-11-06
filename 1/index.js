Vue.component("todo-list", {
  props: ["todo", "index"],
  data() {
    return {
      isEditing: false,
      temp: ""
    };
  },
  template: `
				<li>
					<div v-if="!isEditing">
						{{ todo.message }}
						<button @click="edit">Edit</button>
						<button @click="delToDo">Delete</button>
					</div>
					<div v-else>
						<input v-model="temp"/>
						<button @click="save">Save</button>
						<button @click="cancel">Cancel</button>
					</div>
				</li>
	`,
  methods: {
    edit: function() {
      this.temp = this.todo.message;
      this.isEditing = true;
    },
    delToDo: function() {
      this.isEditing = false;
      vue.delete(this.index);
    },
    save: function() {
      this.isEditing = false;
      vue.save(this.temp, this.index);
    },
    cancel: function() {
      this.isEditing = false;
    }
  }
});

var vue = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
    todos: [
      { id: 1, message: "Foo" },
      { id: 2, message: "Bar" },
      { id: 3, message: "Baz" }
    ],
    lastID: 3
  },
  methods: {
    add: function() {
      this.lastID++;
      // this.todos.length++;
      this.todos.push({
        id: this.lastID,
        message: "New ToDo"
      });
    },
    delete: function(index) {
      this.todos.splice(index, 1);
    },
    save: function(msg, index) {
      this.todos[index].message = msg;
    }
  }
});
