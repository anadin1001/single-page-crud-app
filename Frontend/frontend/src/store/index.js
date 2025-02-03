import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    books: [],
    authors: [],
  },
  mutations: {
    SET_BOOKS(state, books) {
      state.books = books
    },
    ADD_BOOK(state, book) {
      state.books.push(book)
    },
    DELETE_BOOK(state, bookId) {
      state.books = state.books.filter((book) => book.id !== bookId)
    },
    UPDATE_BOOK(state, updatedBook) {
      const index = state.books.findIndex(book => book.id === updatedBook.id);
      if (index !== -1) {
          state.books[index] = { ...state.books[index], ...updatedBook };
      }
    },
    SET_AUTHORS(state, authors) {
      state.authors = authors
    },
    ADD_AUTHOR(state, author) {
      state.authors.push(author)
    },
    DELETE_AUTHOR(state, authorId) {
      state.authors = state.authors.filter((author) => author.id !== authorId)
    },
    UPDATE_AUTHOR(state, updatedAuthor) {
      const index = state.authors.findIndex((author) => author.id === updatedAuthor.id)
      if (index !== -1) {
        state.authors[index] = updatedAuthor
      }
    },
    REMOVE_BOOKS_BY_AUTHOR(state, authorId) {
      state.books = state.books.filter((book) => book.authorId !== authorId)
    },
  },
  actions: {
    async fetchBooks({ commit }) {
      try {
        const response = await axios.get('http://localhost:8080/api/books')
        commit('SET_BOOKS', response.data)
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    },
    async fetchAuthors({ commit }) {
      try {
        const response = await axios.get('http://localhost:8080/api/authors')
        commit('SET_AUTHORS', response.data)
      } catch (error) {
        console.error('Error fetching authors:', error)
      }
    },
    async addBook({ commit }, bookData) {
      try {
        console.log('Sending book data to API:', bookData)
        const response = await axios.post('http://localhost:8080/api/books', bookData)

        if (!response.data.savedBook) {
          throw new Error('Response does not contain savedBook')
        }

        commit('ADD_BOOK', response.data.savedBook)
        return response.data.savedBook // Returnăm cartea pentru debugging
      } catch (error) {
        console.error('Error adding book:', error.response?.data || error)
        throw error
      }
    },
    async deleteBook({ commit, state }, { authorId, bookId }) {
      try {
        console.log(`Sending DELETE request for book ID: ${bookId}, author ID: ${authorId}`)

        await axios.delete('http://localhost:8080/api/books', {
          data: { authorId, bookId },
          headers: { 'Content-Type': 'application/json' },
        })

        commit('DELETE_BOOK', bookId)

        const author = state.authors.find((author) => author.id === authorId)
        if (author) {
          author.books = author.books.filter((book) => book.id !== bookId)
        }

        console.log('✅ Book deleted successfully from store!')
      } catch (error) {
        console.error('Error deleting book:', error)
      }
    },
    async updateBook({ commit }, {authorId, bookId, updatedData }) {
      try {
        console.log("Updating book with:", { authorId, bookId, updatedData });

        const response = await axios.put(
          `http://localhost:8080/api/books/${authorId}/${bookId}`,
          updatedData,
        )
        commit('UPDATE_BOOK', response.data.updatedBook)
      } catch (error) {
        console.error('Error updating book:', error)
      }
    },
    async addAuthor({ commit }, authorData) {
      try {
        console.log('Sending author data to API:', authorData)
        const response = await axios.post('http://localhost:8080/api/authors', authorData)
        console.log('Response from API:', response.data)
        commit('ADD_AUTHOR', response.data.authorData)
      } catch (error) {
        console.error('Error adding author:', error)
      }
    },
    async deleteAuthor({ commit }, authorId) {
      try {
        await axios.delete(`http://localhost:8080/api/authors/${authorId}`)
        commit('DELETE_AUTHOR', authorId)
      } catch (error) {
        console.error('Error deleting author:', error)
      }
    },
    async updateAuthor({ commit }, { authorId, updatedData }) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/authors/${authorId}`,
          updatedData,
        )
        commit('UPDATE_AUTHOR', response.data.updatedData)
      } catch (error) {
        console.error('Error updating author:', error)
      }
    },
    removeBooksByAuthor({ commit }, authorId) {
      commit('REMOVE_BOOKS_BY_AUTHOR', authorId)
    },
  },
  getters: {
    allBooks: (state) => state.books,
    allAuthors: (state) => state.authors,
  },
})
