<template>
        <v-container class="mt-16">
            <v-card class="login-card" rounded="4" align="center">
                <v-card-title>Login</v-card-title>
                <v-form class="login-form" v-model="valid">
                    <v-container>
                        <v-row>
                            <v-col
                            cols="12"
                            >
                            <v-text-field
                                v-model="email"
                                label="E-Mail"
                                type="email"
                                required
                            ></v-text-field>
                            </v-col>

                            <v-col
                            cols="12"
                            >
                            <v-text-field
                                v-model="password"
                                label="Passwort"
                                type="password"
                                required
                            ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
                <v-card-text class="no-account-text mb-16">
                    <router-link to="/register" style="text-decoration: none;">Noch kein Account?</router-link>
                </v-card-text>
                <v-btn
                class="mb-8"
                elevation="0"
                variant="outlined"
                rounded="2"
                @click="login()">
                    Jetzt Einloggen
                </v-btn>
            </v-card>
        </v-container>
</template>

<script setup>
import { ref } from 'vue'
const email = ref('')
const password = ref('')

function login() {
    console.log(email.value)
    console.log(password.value)
}
</script>

<style scoped>
.login-card {
    max-width: 400px;
    margin: 0 auto;
}

.no-account-text {
    margin-top: -30px;
}
</style>