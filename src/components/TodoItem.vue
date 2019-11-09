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
        name: "TodoItem",
        props: ["todo", "index"],
        data() {
            return {
                isEditing: this.todo.isEditing,
                temp: ""
            };
        },
        methods: {
            edit: function() {
                this.temp = this.todo.message;
                this.isEditing = true;
            },
            delToDo: function() {
                this.isEditing = false;
                this.$parent.deleteEntry(this.index);
            },
            save: function() {
                this.isEditing = false;
                this.$parent.saveEntry(this.temp, this.index);
            },
            cancel: function() {
                this.isEditing = false;
            }
        }
    }
</script>

<style scoped>

</style>