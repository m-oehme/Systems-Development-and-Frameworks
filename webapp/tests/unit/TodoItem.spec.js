import { shallowMount } from "@vue/test-utils";
import TodoItem from "@/components/TodoItem";

const wrapper = shallowMount(TodoItem, {
  propsData: {
    todo: {
      id: 1,
      text: "todo.text",
      author: {
        name: "Max"
      }
    }
  }
});

describe("TodoItem", () => {
  it("renders todo.text", () => {
    expect(wrapper.html()).toContain("todo.text");
  });
  it("does not show input field", () => {
    expect(wrapper.contains("input")).toBe(false);
  });

  describe("click on edit button", () => {
    it("does show input field", () => {
      wrapper.find("#edit").trigger("click");

      expect(wrapper.contains("input")).toBe(true);
    });

    describe("edit text and submit", () => {
      it("$emits save with edited todo", () => {
        wrapper.find("#save").trigger("click");

        expect(wrapper.emitted()).toBeTruthy();
      });
    });
  });

  describe("click on edit button", () => {
    it("$emits delete", () => {
      wrapper.find("#delete").trigger("click");

      expect(wrapper.emitted()).toBeTruthy();
    });
  });
});
