<template>
  <v-dialog :model-value="modelValue" max-width="800px">
    <v-card>
      <v-card-title>{{ book.title }}</v-card-title>
      <v-card-text>
        <p><strong>Published:</strong> {{ book.year }}</p>
        <p><strong>Genre:</strong> {{ book.genre }}</p>
        <p><strong>Description:</strong> {{ book.description }}</p>
        <p><strong>Pages:</strong>{{ book.pages }}</p>  
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  book: Object,
  modelValue: Boolean // ce se fol in v-model
});

//se emite eveniment pt inchiderea ferestrei
const emit = defineEmits(["update:modelValue"]);

const closeDialog = () => {
  emit("update:modelValue", false); // anunta book cardul sa inchida dialogul
};

</script>

<!-- pune autorul la carte!!! -->
