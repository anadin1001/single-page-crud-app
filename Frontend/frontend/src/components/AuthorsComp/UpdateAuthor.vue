<template>
  <div>
    <v-btn color="blue darken-1" class="edit-btn" @click="openDialog">
      Edit
    </v-btn>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Edit Author</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="editedAuthor.name" label="Name" :error-messages="validationErrors.name"
              @input="validateField('name')"></v-text-field>

            <v-text-field v-model="editedAuthor.genre" label="Genre" :error-messages="validationErrors.genre"
              @input="validateField('genre')"></v-text-field>

            <v-text-field v-model="editedAuthor.nationality" label="Nationality"></v-text-field>

            <v-text-field v-model="editedAuthor.email" label="Email" :error-messages="validationErrors.email"
              @input="validateField('email')"></v-text-field>

            <v-text-field v-model="editedAuthor.biography" label="Biography"
              :error-messages="validationErrors.biography" @input="validateField('biography')"></v-text-field>

            <v-text-field v-model="editedAuthor.age" label="Age" type="number" :error-messages="validationErrors.age"
              @input="validateField('age')"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" @click="submitUpdate">Save</v-btn>
          <v-btn color="red darken-1" @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
import { authorValidationRules } from "@/utils/validationRules";

const props = defineProps({
  author: Object,
});

const store = useStore();
const dialog = ref(false);
const editedAuthor = ref({ ...props.author });

const validationErrors = ref({
  name: [],
  genre: [],
  email: [],
  biography: [],
  age: [],
});


const validateField = (field) => {
  validationErrors.value[field] = authorValidationRules[field]
    .map((rule) => rule(editedAuthor.value[field]))
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


const openDialog = () => {
  editedAuthor.value = { ...props.author };
  validationErrors.value = {
    name: [],
    genre: [],
    email: [],
    biography: [],
    age: [],
  };
  dialog.value = true;
};


const submitUpdate = async () => {
  if (!validateForm()) {
    return;
  }
  try {
    await store.dispatch("updateAuthor", {
      authorId: props.author.id,
      updatedData: editedAuthor.value,
    });
    dialog.value = false; 
  } catch (error) {
    console.error("Error updating author:", error);
  }
};


const closeDialog = () => {
  dialog.value = false;
};
</script>

<style scoped>
.edit-btn {
  margin-left: 10px;
}
</style>
