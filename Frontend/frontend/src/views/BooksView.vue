<template>
  <v-container fluid class="books-container">
    <!-- <h1 class="text-center mb-3">Books</h1> -->
    
    <!-- imi modifica label-ul la cautare si mi se reseteaza paginarea  -->
    <v-text-field
      v-model="searchQuery"
      label="Search books..."
      prepend-inner-icon="mdi-magnify"
      class="search-bar"
      variant="outlined"
      @input="resetPagination"
    ></v-text-field>

    <v-row justify="center">
      <v-col v-for="book in paginatedBooks" :key="book.id" cols="12" sm="6" md="4">
        <BookCard :book="book" />
      </v-col>
    </v-row>


    <v-row justify="center" class="pagination-container">
    <v-col cols="12" class="text-center">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        @update:modelValue="paginatedBooks"
      ></v-pagination>

      <v-btn 
        :disabled="currentPage === 1" 
        @click="prevPage" 
        class="pagination-btn"
      >
        Previous
      </v-btn>

      <v-btn 
        :disabled="currentPage === totalPages" 
        @click="nextPage" 
        class="pagination-btn"
      >
        Next
      </v-btn>
    </v-col>
  </v-row>

  </v-container>
</template>

<script setup>
import { ref, onMounted, computed,watch } from "vue";
import axios from "axios";
import BookCard from "@/components/BookCard.vue";

const books = ref([]);
const searchQuery = ref(""); // caut prin asta 
const currentPage = ref(1);
const booksPerPage = 9;

//pentru toate cartile din colectie!!! 
const fetchBooks = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/books");
    books.value = response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

// reseteaza pagina la cautare
const resetPagination = () => {
currentPage.value = 1;
};

// filtrare
const filteredBooks = computed(() => {
return books.value.filter(book =>
  book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
);
});

// calculeaza nr pagini cand cautam
const totalPages = computed(() => Math.ceil(filteredBooks.value.length / booksPerPage));

// 
const paginatedBooks = computed(() => {
const start = (currentPage.value - 1) * booksPerPage;
return filteredBooks.value.slice(start, start + booksPerPage);
});


const prevPage = () => {
if (currentPage.value > 1) {
  currentPage.value--;
}
};

const nextPage = () => {
if (currentPage.value < totalPages.value) {
  currentPage.value++;
}
};

// folosim watch atunci cand cautam pt a schimba paginarea 
watch(filteredBooks, () => {
if (currentPage.value > totalPages.value) {
  currentPage.value = totalPages.value || 1;
}
});

onMounted(fetchBooks);
</script>

<style scoped>
.books-container {
  margin-top: 65px;
  width: 100vw;
  height: 100vh;
  background-color: #F6DED8;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* .pagination-container {
  margin-top: auto;
  padding-bottom: 30px;
} */

.v-btn {
  text-transform: none;
  font-size: 16px;
  color: #000;
}

.search-bar {
  max-height: 80px;
}

h1 {
  color: #333;
}
</style>