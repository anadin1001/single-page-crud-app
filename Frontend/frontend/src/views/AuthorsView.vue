<template>
  <v-container fluid class="authors-container">
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="showDialog = true" class="addButton">Add Author</v-btn>
      </v-col>
    </v-row>

    <!-- Add author dialog -->
    <AddAuthor v-model="showDialog" @authorAdded="handleNewAuthor" />

    <!-- Search bar -->
    <v-text-field
      v-model="searchQuery"
      label="Search author..."
      prepend-inner-icon="mdi-magnify"
      class="search-bar"
      variant="outlined"
    ></v-text-field>

    <!-- Authors list -->
    <v-row justify="center">
      <v-col
        v-for="author in filteredAuthors"
        :key="author.id"
        cols="12"
        sm="6"
        md="4"
      >
        <AuthorCard
          :author="author"
          @author-deleted="removeAuthor"
          @authorUpdated="updateAuthor"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import AddAuthor from "@/components/AuthorsComp/AddAuthor.vue";
import AuthorCard from "@/components/AuthorsComp/AuthorCard.vue"; 

const store = useStore();
// const authors = ref([]);
const searchQuery = ref("");
const showDialog = ref(false);

onMounted(() => {
  store.dispatch("fetchAuthors");
});

const authors = computed(() => store.state.authors);

const removeAuthor = (authorId) => {
  store.dispatch("deleteAuthor", authorId);
};
  

const updateAuthor = (updatedAuthor) => {
  const index = authors.value.findIndex((author) => author.id === updatedAuthor.id);
  if (index !== -1) {
    authors.value[index] = updatedAuthor;
  }
};

const handleNewAuthor = (newAuthor) => {
  store.dispatch("addAuthor", newAuthor);
};

const filteredAuthors = computed(() => {
  if (!searchQuery.value) {
    return authors.value;
  }
  return authors.value.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// onMounted(fetchAuthors);
</script>

<style scoped>
.authors-container {
  max-width: 100%;
  width: 100vw;
  min-height: calc(100vh - 60px); /* Adjust the height to account for the footer */
  padding-bottom: 60px; /* Add padding to the bottom to ensure content is not hidden behind the footer */
  background-color: #F6DED8;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

}

.search-bar {
  margin-bottom: 20px;
}

.addButton {
  margin-top: 100px;
}

@media (max-width: 600px) {
  .authors-container {
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