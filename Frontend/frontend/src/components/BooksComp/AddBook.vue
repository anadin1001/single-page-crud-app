<template>
  <div>
    <v-btn class="button-56" @click="openDialog">
      Add Book
    </v-btn>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Add a New Book</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="book.title" label="Title" :error-messages="validationErrors.title"
              @input="validateField('title')"></v-text-field>

            <v-text-field v-model="book.genre" label="Genre" :error-messages="validationErrors.genre"
              @input="validateField('genre')"></v-text-field>

            <v-text-field v-model="book.year" label="Year" type="number" :error-messages="validationErrors.year"
              @input="validateField('year')"></v-text-field>

            <v-textarea v-model="book.description" label="Description" :error-messages="validationErrors.description"
              @input="validateField('description')"></v-textarea>

            <v-text-field v-model="book.pages" label="Pages" type="number" :error-messages="validationErrors.pages"
              @input="validateField('pages')"></v-text-field>

            <v-radio-group v-model="book.authorId" label="Select Author">
              <v-radio v-for="author in authors" :key="author.id" :label="author.name" :value="author.id">
              </v-radio>
            </v-radio-group>

            <v-alert v-if="!book.authorId" type="error" dense>
              You must select an author!
            </v-alert>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" @click="submitBook">Save</v-btn>
          <v-btn color="red darken-1" @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { bookValidationRules } from "@/utils/validationRules";

const store = useStore();
const dialog = ref(false);
const book = ref({
  title: "",
  genre: "",
  year: "",
  description: "",
  pages: "",
  authorId: "",
});

// Autorii sunt din store
const authors = computed(() => store.state.authors);

const validationErrors = ref({
  title: [],
  genre: [],
  year: [],
  description: [],
  pages: [],
});

const openDialog = () => {
  book.value = {
    title: "",
    genre: "",
    year: "",
    description: "",
    pages: "",
    authorId: "",
  };
  validationErrors.value = {
    title: [],
    genre: [],
    year: [],
    description: [],
    pages: [],
  };
  dialog.value = true;

  // ii incarcam din store in form
  store.dispatch("fetchAuthors");
};

const validateField = (field) => {
  validationErrors.value[field] = bookValidationRules[field]
    .map((rule) => rule(book.value[field]))
    .filter((result) => result !== true);
};

const validateForm = () => {
  let isValid = true;
  Object.keys(bookValidationRules).forEach((field) => {
    validateField(field);
    if (validationErrors.value[field].length > 0) {
      isValid = false;
    }
  });
  return isValid;
};

// trimitere prin vuex
const submitBook = async () => {
  if (!validateForm()) return;

  book.value.year = Number(book.value.year);
  book.value.pages = Number(book.value.pages);

  try {
    console.log("Sending book data:", book.value);
    
    const response = await store.dispatch("addBook", book.value);
    console.log("Book added successfully:", response);

    closeDialog();
  } catch (error) {
    console.error("Error adding book:", error.response?.data || error);
  }
};

// Închidere dialog
const closeDialog = () => {
  dialog.value = false;
};
</script>

<style scoped>
.add-btn {
  margin-bottom: 10px;
}

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
