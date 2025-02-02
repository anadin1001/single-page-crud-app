<template>
  <v-dialog :model-value="modelValue" max-width="500px">
    <v-card>
      <v-card-title>Add New Author</v-card-title>
      <v-card-text>
        <v-text-field v-model="author.name" label="Name" :error-messages="validationErrors.name"
          @input="validateField('name')"></v-text-field>

        <v-text-field v-model="author.genre" label="Genre" :error-messages="validationErrors.genre"
          @input="validateField('genre')"></v-text-field>

        <v-text-field v-model="author.nationality" label="Nationality"></v-text-field>

        <v-text-field v-model="author.email" label="Email" :error-messages="validationErrors.email"
          @input="validateField('email')"></v-text-field>

        <v-text-field v-model="author.biography" label="Biography" :error-messages="validationErrors.biography"
          @input="validateField('biography')"></v-text-field>

        <v-text-field v-model="author.age" label="Age" type="number" :error-messages="validationErrors.age"
          @input="validateField('age')"></v-text-field>

      </v-card-text>
      <v-card-actions>
        <v-btn color="green" @click="submitAuthor">Save</v-btn>
        <v-btn color="red" @click="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";
import axios from "axios";
import { validationRules } from "@/utils/validationRules";

// Props pentru controlul dialogului
defineProps({
  modelValue: Boolean, // Legătură cu `v-model` din `AuthorView.vue`
});

const emit = defineEmits(["update:modelValue", "authorAdded"]);

// Modelul pentru autor
const author = ref({
  name: "",
  age: "",
  nationality: "",
  email: "",
  biography: "",
  genre: "",
});

// Obiect pentru erori
const validationErrors = ref({
  name: [],
  genre: [],
  email: [],
  biography: [],
  age: [],
});

const validateField = (field) => {
  validationErrors.value[field] = validationRules[field]
    .map((rule) => rule(author.value[field]))
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

// Trimitere catre backend
const submitAuthor = async () => {
  if (!validateForm()) {
    return;
  }
  try {
    const response = await axios.post("http://localhost:8080/api/authors", author.value);
    emit("authorAdded", response.data); // Trimite noul autor înapoi la `AuthorView.vue`
    closeDialog();
  } catch (error) {
    console.error("Error adding author:", error);
  }
};


// close dialog
const closeDialog = () => {
  author.value = {
    name: "",
    age: "",
    nationality: "",
    email: "",
    biography: "",
    genre: "",
  };
  emit("update:modelValue", false);
};
</script>