import { shallowMount } from "@vue/test-utils";
import TodoList from "@/components/TodoList";

const wrapper = shallowMount(TodoList, {
  propsData: {}
});

describe("TodoList", () => {
  it("$emits add todo", () => {
    wrapper.find("#add").trigger("click");

    expect(wrapper.emitted()).toBeTruthy();
  });
});
