<template>
  <v-card class="author-card" elevation="4">
    <!-- <v-img :src="book.image" height="200px" cover></v-img> -->
    <v-card-title class="text-center">{{ author.name }}</v-card-title>
    <v-card-subtitle class="text-center">{{ author.genre }}</v-card-subtitle>
    <v-card-actions>
      <v-btn color="primary" @click="showDialog = true">View Details</v-btn>
      <UpdateAuthor :author="author" @authorUpdated="emit('authorUpdated', author.id)" />

      <!-- Se emite un eveniment la stergere pentru refacere lista autori -->
      <DeleteAuthor :authorId="author.id" @authorDeleted="emit('authorDeleted', author.id)" />
    </v-card-actions>

    <AuthorDetails :author="author" v-model="showDialog" />
    
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import AuthorDetails from './AuthorDetails.vue';
import DeleteAuthor from './DeleteAuthor.vue';
import UpdateAuthor from './UpdateAuthor.vue';


defineProps({
  author: Object,
});

const emit = defineEmits(["authorDeleted", "authorUpdated"]);

const showDialog = ref(false);

</script>


<style scoped>

.author-card {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;
}

.author-card:hover {
  transform: scale(1.05);
}

.text-center{
  text-align: center;
}
</style>
