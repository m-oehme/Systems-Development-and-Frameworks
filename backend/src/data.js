const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

module.exports.books = books;

const hello = "I am coming from the Backend to kill you! NOT";

module.exports.hello = hello;

const todoListData = [
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
];

module.exports.todoListData = todoListData;

module.exports.userData = [
  {
    username: "Max"
  },
  {
    username: "Victor"
  }
];
