import Vue from 'vue'
import TodoItem from "../../src/components/TodoItem";

describe("TodoList", () => {
    if('has a created hook', () => {
        expect(typeof TodoItem.name).toBe("function")
    });

});