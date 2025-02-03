<template>
  <v-container fluid class="authors-container">
    <v-row>
      <v-col cols="12">
        <v-btn v-if="isAuthenticated"  @click="showDialog = true" class="button-56">Add Author</v-btn>
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

const isAuthenticated = computed(() => store.getters.isAuthenticated);
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
  min-height: calc(100vh - 60px); 
  padding-top: 100px;
  padding-bottom: 80px; 
  background-color: #F6DED8;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

}

.search-bar {
  margin-bottom: 20px;
}


@media (max-width: 600px) {
  .authors-container {
    padding: 10px;

  }

  .search-bar {
    margin-bottom: 10px;
  }
}


/* CSS */
.button-56 {
  align-items: center;
  background-color: #B5828C;
  border: 2px solid #111;
  border-radius: 8px;
  box-sizing: border-box;
  margin-bottom: 20px;
  color: #111;
  cursor: pointer;
  display: flex;
  font-family: Inter,sans-serif;
  font-size: 12px;
  height: 46px;
  justify-content: center;
  line-height: 24px;
  max-width: 100%;
  padding: 0 20px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-56:after {
  background-color: #111;
  border-radius: 8px;
  content: "";
  display: block;
  height: 48px;
  left: 0;
  width: 100%;
  position: absolute;
  top: -2px;
  transform: translate(8px, 8px);
  transition: transform .2s ease-out;
  z-index: -1;
}

.button-56:hover:after {
  transform: translate(0, 0);
}

.button-56:active {
  background-color: #ffdeda;
  outline: 0;
}

.button-56:hover {
  outline: 0;
}

@media (min-width: 768px) {
  .button-56 {
    padding: 0 40px;
  }
}

</style>