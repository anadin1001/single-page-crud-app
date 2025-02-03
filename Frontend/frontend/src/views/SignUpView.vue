<template>
    <v-container fluid class="signup-container">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="pa-4">
            <v-card-title class="headline text-center">Sign Up</v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  v-model="user.fullName"
                  label="Full Name"
                  required
                  :rules="[rules.required]"
                ></v-text-field>
  
                <v-text-field
                  v-model="user.email"
                  label="Email"
                  type="email"
                  required
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
  
                <v-text-field
                  v-model="user.password"
                  label="Password"
                  type="password"
                  required
                  :rules="[rules.required, rules.minPassword]"
                ></v-text-field>
  
                <v-text-field
                  v-model="user.confirmPassword"
                  label="Confirm Password"
                  type="password"
                  required
                  :rules="[rules.required, rules.matchPassword]"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="primary" @click="signUp">Sign Up</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const user = ref({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const rules = {
    required: (value) => !!value || "This field is required.",
    email: (value) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
    minPassword: (value) =>
      value.length >= 6 || "Password must be at least 6 characters long.",
    matchPassword: (value) =>
      value === user.value.password || "Passwords must match.",
  };
  
  const signUp = () => {
    console.log("Signing up with:", user.value);
  };
  </script>
  
  <style scoped>
  .signup-container {
    max-width: 100%;
    width: 100vw;
    min-height: calc(100vh - 60px);
    padding-bottom: 60px;
    background-color: #F6DED8;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .v-card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }
  
  .headline {
    margin-bottom: 20px;
  }
  </style>
  