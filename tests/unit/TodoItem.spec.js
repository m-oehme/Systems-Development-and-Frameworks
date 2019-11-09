import { shallowMount } from '@vue/test-utils'
import TodoItem from "@/components/TodoItem";

const wrapper = shallowMount(TodoItem, {
    propsData: {
        todo: {
            id: 1,
            message: "todo.text"
        }
    }
});

describe("TodoList", () => {
    if('has a created hook', () => {
    });

    expect(typeof TodoItem.name).toBe("function")
});