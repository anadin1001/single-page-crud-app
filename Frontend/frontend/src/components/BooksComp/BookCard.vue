<template>
  <v-card class="book-card" elevation="4">
    <!-- <v-img :src="book.image" height="200px" cover></v-img> -->
    <v-card-title class="text-center">{{ book.title }}</v-card-title>
    <v-card-subtitle class="text-center">{{ book.author }}</v-card-subtitle>

    <v-card-actions>
      <v-btn color="primary" @click="showDialog = true">View Details</v-btn>
      <UpdateBook :book="book" :authorId="book.authorId" @bookUpdated="handleUpdate" />
      <DeleteBook :bookId="book.id" :authorId="authorId" @bookDeleted="emit('bookDeleted', book.id)" />
    </v-card-actions>

    <BookDetails :book="book" v-model="showDialog" />

  </v-card>
</template>

<script setup>
import BookDetails from './BookDetails.vue';
import {ref} from 'vue'; // pt composition api
import { defineProps } from 'vue';
import DeleteBook from './DeleteBook.vue';
import UpdateBook from './UpdateBook.vue';

defineProps({
  book: Object,
  authorId: String,
});

const emit = defineEmits(["bookDeleted"]);

const handleUpdate = (bookId) => {
  emit('bookUpdated', bookId);
}

const showDialog = ref(false);
</script>


<style scoped>
.book-card {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;
}

.book-card:hover {
  transform: scale(1.05);
}

.text-center {
  text-align: center;
}
</style>