<template>
    <v-container align="center">
        <!-- Angebot anlegen -->
        <v-card rounded="4" style="max-width: 1300px">
            <v-card-title justify="center" align="center">
                Jetzt dein Angebot listen!
            </v-card-title>
        </v-card>

        <v-card rounded="4" v-if="vehicles.length===0" class="my-8 content-card">
            <v-card-text align="center">
                Du hast leider noch keine Autos registriert. 
                Unter <router-link to="/vehicles" style="text-decoration: none">Meine Fahrzeuge</router-link> kannst du dein erstes Auto anlegen.
            </v-card-text>
        </v-card>

        <v-card rounded="4" class="my-8 content-card" v-if="vehicles.length>0">
            <v-card-text>
                <v-form class="login-form">
                    <v-container>
                        <v-select 
                        label="Wähle dein Auto"
                        :v-model="offer.vehicle">

                        </v-select>
                        <v-row>
                            <v-col
                            cols="12"
                            sm="6"
                            >
                            <v-text-field
                                v-model="offer.start"
                                label="Abholort"
                                type="text"
                                required
                            ></v-text-field>
                            </v-col>

                            <v-col
                            cols="12"
                            sm="6"
                            >
                            <v-text-field
                                v-model="offer.end"
                                label="Ankunftsort"
                                type="text"
                                required
                            ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-textarea
                        v-model="offer.description"
                        label="Gib deinem Angebot eine Beschreibung!"
                        counter
                        :rules="rules"
                        >
                        </v-textarea>

                        <v-row align="center">
                            <v-col cols="12" sm="6">
                                <v-text-field
                                v-model="offer.price"
                                label="Preis in Euro"
                                type="number"
                                required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-btn color="green" @click="createOffer()">Angebot machen</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "createOffer",
    data() {
        return {
            offer: {
                description: "",
                price: "",
                vehicle: "",
                start: "",
                end: "",
            },
            vehicles: [],
            rules: [v => v.length <= 128 || 'Max 128 characters, everything after will be cut off'],
        };
    },
    methods: {
        getVehicles() {
            console.log("get vehicles");
        },
        createOffer() {
            console.log(this.offer);
        },
    }
};


</script>

<style scoped>
.content-card {
    max-width: 600px;
    margin: 0 auto;
}

</style>