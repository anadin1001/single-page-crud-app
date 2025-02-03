<template>
    <v-container fluid class="signin-container">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="pa-4">
                    <v-card-title class="headline text-center">Sign In</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="signIn">
                            <v-text-field v-model="email" label="Email" type="email" required
                                :rules="[rules.required, rules.email]"></v-text-field>
                            <v-text-field v-model="password" label="Password" type="password" required
                                :rules="[rules.required]"></v-text-field>
                            <v-card-actions class="justify-center">
                                <v-btn color="primary" type="submit">Login</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();

const rules = {
    required: (value) => !!value || "Required.",
    email: (value) => /.+@.+\..+/.test(value) || "E-mail must be valid."
};

const signIn = async () => {
    try {
        console.log("Signing in...");
        console.log(email.value, password.value);
        const userCredentials = await signInWithEmailAndPassword(auth, email.value, password.value);
        const token = await userCredentials.user.getIdToken();

        localStorage.setItem("token", token);
        console.log("Signed in", userCredentials);  
        router.push("/"); //redirectioneaza catre pagina de home
    } catch (err) {
        console.error("Error signing in", err);
    }
}
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