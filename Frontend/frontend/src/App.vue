<template>
  <v-app >
    <Navbar />
    <v-main class="main-content">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from "@/components/NavbarItem.vue";
</script>

<style>
.v-app {
  background-color: #6d2b2b;

}

.main-content {
  padding-top: 64px; 
}
</style>
