<template>
  <v-container fluid class="home-container">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" class="text-center">
        <div class="overlay">
          <h1>Welcome to the Library</h1>
        </div>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

.home-container {
  width: 100vw;
  height: 100vh;
  background: url("@/assets/Welcome.jpeg") no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Stiluri pentru text */
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  font-size: 2rem;
}
</style>
