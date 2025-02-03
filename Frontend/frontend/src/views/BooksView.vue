<template>
  <v-container fluid class="books-container">
    <!-- Add book component -->
    <AddBook />

    <!-- Search bar -->
    <v-text-field
      v-model="searchQuery"
      label="Search book..."
      prepend-inner-icon="mdi-magnify"
      class="search-bar"
      variant="outlined"
    ></v-text-field>

    <!-- Books Grid -->
    <v-row justify="center">
      <v-col v-for="book in filteredBooks" :key="book.id" cols="12" sm="6" md="4">
        <BookCard :book="book" @bookDeleted="removeBook" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import AddBook from "@/components/BooksComp/AddBook.vue";
import BookCard from "@/components/BooksComp/BookCard.vue";

const store = useStore();
const searchQuery = ref("");

// Fetch books la montare
onMounted(() => {
  store.dispatch("fetchBooks");
});

// imi ia cartile din store cu metoda getBooks
const books = computed(() => store.state.books);

// filtreaza cartile
const filteredBooks = computed(() => {
  if (!searchQuery.value) {
    return books.value;
  }
  return books.value.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// imi sterge din carti cartea
const removeBook = (bookId) => {
  store.dispatch("deleteBook", bookId);
};
</script>

<style scoped>
.books-container {
  max-width: 100%;
  width: 100vw;
  min-height: calc(100vh - 60px);
  padding-top: 60px;
  padding-bottom: 60px;
  background-color: #F6DED8;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.search-bar {
  margin-bottom: 20px;
}
</style>


<!-- ???????De ce am delete si in bookview si in deletebook -->