<template>
    <li>
        <div v-if="!isEditing">
            {{ todo.message }}
            <button id="edit" @click="edit">Edit</button>
            <button id="delete" @click="delToDo">Delete</button>
        </div>
        <div v-else>
            <input v-model="temp" />
            <button id="save" @click="save">Save</button>
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
                this.$emit("deleteEntry", this.index);
                // this.$parent.deleteEntry(this.index);
            },
            save: function() {
                this.isEditing = false;
                this.todo.message = this.temp;
                this.$emit("saveEntry", this.temp, this.index);
                // this.$parent.saveEntry(this.temp, this.index);
            },
            cancel: function() {
                this.isEditing = false;
            }
        }
    }
</script>

<style scoped>

</style>