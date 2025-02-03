<template>
    <v-dialog :model-value="modelValue" max-width="800px">
      <v-card>
        <v-card-title>{{ author.name}}</v-card-title>
        <!-- <v-card-subtitle>by {{ book.author }}</v-card-subtitle> -->
        <v-card-text>
          <p><strong>Email:</strong> {{ author.email }}</p>
          <p><strong>Genre:</strong> {{ author.genre }}</p>
          <p><strong>Biography:</strong> {{ author.biography }}</p>
          <p><strong>Nationality:</strong>{{ author.nationality }}</p>
          <p><strong>Age:</strong> {{ author.age }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  defineProps({
    author: Object,
    modelValue: Boolean // ce se fol in v-model
  });
  
  //se emite eveniment pt inchiderea ferestrei
  const emit = defineEmits(["update:modelValue"]);
  
  const closeDialog = () => {
    emit("update:modelValue", false); // anunta book cardul sa inchida dialogul
  };
  
  </script>
  