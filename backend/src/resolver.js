const { books, hello } = require("./data");

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    hello: () => hello
  }
};

module.exports.resolvers = resolvers;
