<template>
    <div>
      <h2>Authors</h2>
      <ul>
        <li v-for="author in authors" :key="author.id">{{ author.name }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from "vue";
  import { useStore } from "vuex";
  
  const store = useStore();
  
  onMounted(() => {
    store.dispatch("authors/fetchAuthors");
  });
  
  const authors = computed(() => store.getters["authors/allAuthors"]);
  </script>
  