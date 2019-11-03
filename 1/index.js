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
      { id: "1", message: "Foo" },
      { id: "2", message: "Bar" },
      { id: "3", message: "Baz" }
    ]
    //nextID: '',
  },
  methods: {
    add: function() {
      this.todos.push({
        id: this.todos.length + 1,
        message: "New ToDo"
      });
      this.todos.length + 1;
    },
    delete: function(index) {
      this.todos.splice(index, 1);
    },
    save: function(msg, index) {
      this.todos[index].message = msg;
    }
  },
  computed: {
    nextID() {
      let max = Math.max(...this.todos.map(t => t.id), 0);
      return max + 1;
    }
  }
});
