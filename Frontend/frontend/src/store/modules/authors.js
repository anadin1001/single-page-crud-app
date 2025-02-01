import api from "../../services/api";

//fetch pentru getAllAuthors
export default {
  namespaced: true,
  state: {
    authors: [],
  },
  mutations: {
    SET_AUTHORS(state, authors) {
      state.authors = authors;
    },
  },
  actions: {
    async fetchAuthors({ commit }) {
      try {
        const response = await api.get("/authors");
        commit("SET_AUTHORS", response.data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    },
  },
  getters: {
    allAuthors: (state) => state.authors,
  },
};
