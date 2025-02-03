<template>
    <v-container fluid class="signin-container">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="pa-4">
                    <v-card-title class="headline text-center">Sign In</v-card-title>
                    <v-card-text>
                        <v-form ref="form">
                            <v-text-field v-model="credentials.email" label="Email" type="email" required
                                :rules="[rules.required, rules.email]"></v-text-field>
                            <v-text-field v-model="credentials.password" label="Password" type="password" required
                                :rules="[rules.required]"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn color="primary" @click="signIn">Sign In</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from "vue";

const credentials = ref({
    email: "",
    password: ""
});

const rules = {
    required: (value) => !!value || "Required.",
    email: (value) => /.+@.+\..+/.test(value) || "E-mail must be valid."
};

const signIn = () => {
    // Placeholder pentru acțiunea de autentificare
    console.log("Signing in with:", credentials.value);
    // Aici poți adăuga logica de autentificare (API call, Vuex, etc.)
};
</script>

<style scoped>
.signin-container {
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