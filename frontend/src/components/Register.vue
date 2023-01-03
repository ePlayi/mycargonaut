<template>
        <v-container class="mt-16">
            <v-card class="login-card" rounded="4" align="center">
                <v-card-title>Registrierung</v-card-title>
                <v-form class="login-form" v-model="valid">
                    <v-container>
                        <v-row>
                            <v-col
                            cols="12"
                            >
                                <v-file-input
                                    v-model="registerForm.profilePicture.value"
                                    accept=".jpg, .jpeg, .png"
                                    label="Ein Bild von dir!"
                                    prepend-icon="fas fa-camera"
                                ></v-file-input>
                            </v-col>

                            <v-col
                            lg="6"
                            sm="12"
                            >
                            <v-text-field
                                v-model="registerForm.firstname.value"
                                label="Vorname"
                                required
                            ></v-text-field>
                            </v-col>

                            <v-col
                            lg="6"
                            sm="12"
                            >
                            <v-text-field
                                v-model="registerForm.lastname.value"
                                label="Nachname"
                                required
                            ></v-text-field>
                            </v-col>

                            <v-col
                            lg="8"
                            sm="12"
                            >
                            <v-text-field
                                v-model="registerForm.email.value"
                                label="E-Mail"
                                required
                            ></v-text-field>
                            </v-col>

                            <v-col
                            lg="4"
                            sm="12"
                            >
                            <v-text-field
                                v-model="registerForm.birthday.value"
                                label="Geburtsdatum"
                                required
                            ></v-text-field>
                            </v-col>

                            <v-col
                            lg="6"
                            sm="12"
                            >
                            <v-text-field
                                v-model="registerForm.password.value"
                                label="Passwort"
                                required
                            ></v-text-field>
                            </v-col>

                            <v-col
                            lg="6"
                            sm="12"
                            >
                            <v-text-field
                                v-model="passwordRepeat"
                                label="Passwort wiederholen"
                                required
                            ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
                <v-card-text class="no-account-text mb-16">
                    <router-link to="/login" style="text-decoration: none;">Du hast einen Account?</router-link>
                </v-card-text>
                <v-btn
                class="mb-8"
                elevation="0"
                variant="outlined"
                rounded="2"
                @click="register()">
                    Jetzt Registrieren
                </v-btn>
            </v-card>
        </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter()

const passwordRepeat = ref('')
const registerForm = {
    profilePicture: ref(''),
    firstname: ref(''),
    lastname: ref(''),
    email: ref(''),
    birthday: ref(''),
    password: ref(''),
}

function register() {
    console.log(registerForm)
    router.push('/login')
}
</script>

<style scoped>
.login-card {
    max-width: 700px;
    margin: 0 auto;
}

.no-account-text {
    margin-top: -30px;
}
</style>