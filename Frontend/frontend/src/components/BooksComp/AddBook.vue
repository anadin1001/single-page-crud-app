<template>
  <div>
    <v-btn color="primary" class="add-btn" @click="openDialog" >
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
import { ref, defineEmits, watch } from "vue";
import axios from "axios";
import { validationRules } from "@/utils/validationRules";

const emit = defineEmits(["bookAdded"]);

const dialog = ref(false);


const book = ref({
  title: "",
  genre: "",
  year: "",
  description: "",
  pages: "",
  authorId: "",
});

const authors = ref([]);

const validationErrors = ref({
  title: [],
  genre: [],
  year: [],
  description: [],
  pages: [],
});

const fetchAuthors = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/authors");
    authors.value = response.data;
  } catch (error) {
    console.error("Error fetching authors:", error);
  }
};

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
  fetchAuthors();
};

const validateField = (field) => {
  validationErrors.value[field] = validationRules[field]
    .map((rule) => rule(book.value[field]))
    .filter((result) => result !== true);
};

const validateForm = () => {
  let isValid = true;
  Object.keys(validationRules).forEach((field) => {
    validateField(field);
    if (validationErrors.value[field].length > 0) {
      isValid = false;
    }
  });
  return isValid;
};

const submitBook = async () => {
  if (!validateForm()) {
    return;
  }
  console.log("Submitting book:", book.value);
  try {
    console.log("Book Data to be sent:", JSON.stringify(book.value, null, 2));

    const response = await axios.post("http://localhost:8080/api/books", book.value);
    emit("bookAdded", response.data.bookData);
    closeDialog();
  } catch (error) {
    console.error("Error adding book:", error);
  }
};

watch(() => book.value.authorId, (newVal) => {
  console.log("Selected author ID:", newVal);
});

const closeDialog = () => {
  dialog.value = false;
};
</script>


<style scoped>
.add-btn {
  margin-bottom: 10px;
}
</style>