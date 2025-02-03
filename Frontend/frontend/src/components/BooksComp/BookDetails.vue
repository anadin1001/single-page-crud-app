<template>
  <v-dialog :model-value="modelValue" max-width="800px">
    <v-card>
      <v-card-title>{{ book.title }}</v-card-title>
      <v-card-text>
        <p><strong>Author:</strong> {{ authorName }}</p>
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
import {  defineProps, defineEmits, computed} from "vue";
import { useStore } from "vuex";

const store = useStore();

const props =defineProps({
  book: Object,
  modelValue: Boolean // daca e deschis sau nu dialogul
});

const authorName = computed(() => {
  const author = store.state.authors.find((author) => author.id === props.book.authorId);
  return author ? author.name : "Unknown";
});

//se emite eveniment pt inchiderea ferestrei
const emit = defineEmits(["update:modelValue"]);



const closeDialog = () => {
  emit("update:modelValue", false); // anunta book cardul sa inchida dialogul
};

</script>

<!-- pune autorul la carte!!! -->
