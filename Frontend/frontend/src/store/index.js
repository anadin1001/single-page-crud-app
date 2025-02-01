import { createStore } from "vuex";
import authorsModule from "./modules/authors";
// import booksModule from "./modules/books";

const store = createStore({
  modules: {
    authors: authorsModule,
    // books: booksModule,
  },
});

export default store;
