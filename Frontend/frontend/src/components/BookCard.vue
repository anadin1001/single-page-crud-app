<template>
    <v-card class="book-card" elevation="4">
      <!-- <v-img :src="book.image" height="200px" cover></v-img> -->
      <v-card-title class="text-center">{{ book.title }}</v-card-title>
      <v-card-subtitle class="text-center">{{ book.author }}</v-card-subtitle>
      <v-card-actions>
        <v-btn color="primary">View Details</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>

  defineProps({
    book: Object,
  });
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

  .text-center{
    text-align: center;
  }
  </style>
  