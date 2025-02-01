<template>
  <v-app-bar app color="#B5828C" dark>
    <v-container class="d-flex align-center">
      <svg-icon type="mdi" :path="path"></svg-icon>
      <v-toolbar-title class="d-none d-sm-flex" >Library System</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/authors">Authors</v-btn>
      <v-btn text to="/books">Books</v-btn>
      <v-btn text to="/sign">Sign-in</v-btn>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
.v-toolbar-title {
  font-size: 24px;
  color: #ffd4ae;
  margin-left: 10px;
}

.v-btn {
  color: #ffd4ae;
}
@media (max-width: 350px) {
  .v-toolbar-title {
    display: none !important;
  }
}
</style>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiBookHeart } from '@mdi/js';

export default {
  name: "my-component",
  components: {
    SvgIcon
  },
  data() {
    return {
       path: mdiBookHeart,
    }
  }
}
</script>
