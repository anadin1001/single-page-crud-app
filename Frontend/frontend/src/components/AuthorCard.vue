<template>
  <v-card class="author-card" elevation="4">
    <!-- <v-img :src="book.image" height="200px" cover></v-img> -->
    <v-card-title class="text-center">{{ author.name }}</v-card-title>
    <v-card-subtitle class="text-center">{{ author.genre }}</v-card-subtitle>
    <v-card-actions>
      <v-btn color="primary" @click="showDialog = true">View Details</v-btn>
    </v-card-actions>

    <AuthorDetails :author="author" v-model="showDialog" />
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import AuthorDetails from './AuthorDetails.vue';


defineProps({
  author: Object,
});

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
