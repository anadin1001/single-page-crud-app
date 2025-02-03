<template>
  <v-container fluid class="books-container">
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="showDialog = true" class="addButton">Add Book</v-btn>
      </v-col>
    </v-row>

    <!-- Add book dialog -->
    <AddBook v-model="showDialog" @bookAdded="handleNewBook" />

    <!-- Search bar -->
    <v-text-field
      v-model="searchQuery"
      label="Search book..."
      prepend-inner-icon="mdi-magnify"
      class="search-bar"
      variant="outlined"
    ></v-text-field>

    <v-row justify="center">
      <v-col
        v-for="book in filteredBooks"
        :key="book.id"
        cols="12"
        sm="6"
        md="4"
      >
        <BookCard
          :book="book"
          @bookDeleted="removeBook"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import AddBook from "@/components/BooksComp/AddBook.vue";
import BookCard from "@/components/BooksComp/BookCard.vue";

const books = ref([]);
const searchQuery = ref("");
const showDialog = ref(false);

const fetchBooks = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/books");
    books.value = response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

const removeBook = (bookId) => {
  books.value = books.value.filter((book) => book.id !== bookId);
};

const handleNewBook = (newBook) => {
  books.value.push(newBook);
};

const filteredBooks = computed(() => {
  if (!searchQuery.value) {
    return books.value;
  }
  return books.value.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(fetchBooks);
</script>

<style scoped>
.books-container {
  max-width: 100%;
  width: 100vw;
  min-height: calc(100vh - 60px); 
  padding-bottom: 60px; 
  background-color: #F6DED8;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.search-bar {
  margin-bottom: 20px;
}

.addButton {
  margin-top: 20px;
}

@media (max-width: 600px) {
  .books-container {
    padding: 10px;
  }

  .addButton {
    margin-top: 10px;
  }

  .search-bar {
    margin-bottom: 10px;
  }
}
</style>