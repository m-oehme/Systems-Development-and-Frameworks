import { mount } from "@vue/test-utils";
import TodoList from "@/components/TodoList";
import TodoItem from "@/components/TodoItem";

let propsData = {
  todoListData: [
    {
      id: "1",
      text: "Foo",
      author: { name: "Max" }
    },
    {
      id: "2",
      text: "Bar",
      author: { name: "Victor" }
    },
    {
      id: "3",
      text: "Baz",
      author: { name: "Max" }
    }
  ],
  lastID: 3
};

let wrapper;

beforeEach(() => {
  wrapper = mount(TodoList, {
    data: function() {
      return propsData;
    }
  });
});

describe("TodoList", () => {
  it("contains 3 items", function() {
    expect(wrapper.findAll(TodoItem)).toHaveLength(3);
  });

  it("$emits add todo", () => {
    wrapper.find("#addTodo").trigger("click");

    expect(wrapper.emitted()).toBeTruthy();
  });
});
