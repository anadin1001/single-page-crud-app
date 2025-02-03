<template>
  <v-dialog :model-value="modelValue" max-width="500px">
    <v-card>
      <v-card-title>Add New Author</v-card-title>
      <v-card-text>
        <v-form ref="form">
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
        </v-form>
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
import { useStore } from "vuex";
import { authorValidationRules } from "@/utils/validationRules";

const store = useStore();
const emit = defineEmits(["update:modelValue", "authorAdded"]);

defineProps({
  modelValue: Boolean, 
});

//formularul sa fie gol
const author = ref({
  name: "",
  age: "",
  nationality: "",
  email: "",
  biography: "",
  genre: "",
});


const validationErrors = ref({
  name: [],
  genre: [],
  email: [],
  biography: [],
  age: [],
});


const validateField = (field) => {
  validationErrors.value[field] = authorValidationRules[field]
    .map((rule) => rule(author.value[field]))
    .filter((result) => result !== true);
};

const validateForm = () => {
  let isValid = true;
  Object.keys(authorValidationRules).forEach((field) => {
    validateField(field);
    if (validationErrors.value[field].length > 0) {
      isValid = false;
    }
  });
  return isValid;
};


const submitAuthor = async () => {
  console.log("Submitting author:", author.value);
  if (!validateForm()) {
    console.log("Validation failed:", validationErrors.value);
    return;
  } 
  try {
    await store.dispatch("addAuthor", author.value);
    emit("authorAdded", author.value);
    closeDialog();
  } catch (error) {
    console.error("Error adding author:", error);
  }
};

const closeDialog = () => {
  console.log("Closing dialog");
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

<style scoped>
.v-card {
  padding: 10px;
}
</style>
