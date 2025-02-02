<template>
  <v-container fluid class="authors-container">
    <!-- <h1 class="text-center mb-3">Books</h1> -->
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="showDialog = true">Add Author</v-btn>
      </v-col>
    </v-row>

    <!--add author -->
    <AddAuthor v-model="showDialog" @authorAdded="handleNewAuthor" />

    <!-- imi modifica label-ul la cautare si mi se reseteaza paginarea  -->
    <v-text-field v-model="searchQuery" label="Search author..." prepend-inner-icon="mdi-magnify" class="search-bar"
      variant="outlined" @update:model-value="resetPagination"></v-text-field>

    <v-row justify="center">
      <v-col v-for="author in paginatedAuthor" :key="author.id" cols="12" sm="6" md="4">
        <AuthorCard :author="author" />
      </v-col>
    </v-row>


    <v-row justify="center" class="pagination-container">
      <v-col cols="12" class="text-center">
        <v-pagination v-model="currentPage" :length="totalPages" @update:modelValue="paginatedAuthor"></v-pagination>

        <v-btn :disabled="currentPage === 1" @click="prevPage" class="pagination-btn">
          Previous
        </v-btn>

        <v-btn :disabled="currentPage === totalPages" @click="nextPage" class="pagination-btn">
          Next
        </v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import AuthorCard from "@/components/AuthorCard.vue";
import AddAuthor from "@/components/AddAuthor.vue";

const authors = ref([]);
const searchQuery = ref(""); // caut prin asta 
const currentPage = ref(1);
const authorPerPage = 9;

const showDialog = ref(false);

const handleNewAuthor = async() => {
  await fetchAuthors();

};

const fetchAuthors = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/authors");
    authors.value = response.data;
  } catch (error) {
    console.error("Error fetching authors:", error);
  }
};

// reseteaza pagina la cautare
const resetPagination = () => {
  currentPage.value = 1;
};

// filtrare
const filteredAuthors = computed(() => {
  return authors.value.filter(author =>
    author.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// calculeaza nr pagini cand cautam
const totalPages = computed(() => Math.ceil(filteredAuthors.value.length / authorPerPage));


const paginatedAuthor = computed(() => {
  const start = (currentPage.value - 1) * authorPerPage;
  return filteredAuthors.value.slice(start, start + authorPerPage);
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
watch(filteredAuthors, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value || 1;
  }
});

onMounted(fetchAuthors);

</script>

<style scoped>
.authors-container {
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