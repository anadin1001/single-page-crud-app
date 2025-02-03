<template>
  <v-app>
    <NavbarItem />
    <v-main>
      <router-view />
    </v-main>
    <FooterItem />
  </v-app>
</template>

<script setup>
import NavbarItem from "@/components/NavbarItem.vue"; 
import FooterItem from "@/components/FooterItem.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("listenForChanges");//asculta schimbarile la montarea aplicatiei
});
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.v-main {

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding-top: 0px !important;
}
</style>
