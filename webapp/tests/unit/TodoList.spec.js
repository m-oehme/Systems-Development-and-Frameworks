import { shallowMount } from "@vue/test-utils";
import TodoList from "@/components/TodoList";
import TodoItem from "@/components/TodoItem";

const wrapper = shallowMount(TodoList, {
  propsData: {
    todoListData: [
      { id: 1, message: "Foo", isEditing: false },
      { id: 2, message: "Bar", isEditing: false },
      { id: 3, message: "Baz", isEditing: false }
    ],
    lastID: 3
  }
});

describe("TodoList", () => {
  it("contains 3 items", function() {
    expect(wrapper.findAll(TodoItem).length).toBe(3);
  });

  it("$emits add todo", () => {
    wrapper.find("#add").trigger("click");

    expect(wrapper.emitted()).toBeTruthy();
  });
});
