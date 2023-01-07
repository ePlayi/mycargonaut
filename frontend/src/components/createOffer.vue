<template>
    <v-container align="center">
        <!-- Angebot anlegen -->
        <v-card rounded="4" style="max-width: 1300px">
            <v-card-title justify="center" align="center">
                Jetzt dein Angebot listen!
            </v-card-title>
        </v-card>

        <v-card rounded="4" v-if="cars.length===0" class="my-8 content-card">
            <v-card-text align="center">
                Du hast leider noch keine Autos registriert. 
                Unter <router-link to="/vehicles" style="text-decoration: none">Meine Fahrzeuge</router-link> kannst du dein erstes Auto anlegen.
            </v-card-text>
        </v-card>

        <v-card rounded="4" class="my-8 content-card" v-if="cars.length>0">
            <v-card-text>
                <v-form class="login-form">
                    <v-container>
                        <v-select 
                        v-model="defaultCar"
                        :items="cars"
                        item-title="brand"
                        item-value="model"
                        label="Select"
                        return-object
                        single-line
                        >

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
    beforeMount() {
        this.getCars()
    },
    created() {
        document.title = "Angebot anlegen";
    },
    data() {
        return {
            //IF LOCAL TESTED USE THIS URL FOR THE API CALLS
            url: 'http://localhost:3001/',
            // url: 'https://mycargonaut.onrender.com/',
            offer: {
                description: "",
                price: "",
                car: "",
                start: "",
                end: "",
            },
            cars: [],
            defaultCar: "",
            carNames: [],
            rules: [v => v.length <= 128 || 'Max 128 characters, everything after will be cut off'],
        };
    },
    methods: {
        getCars(){
        this.axios.get(this.url+'profile/vehicles',{
        })
            .then((response) => {
                this.cars = response.data.vehicleList
                this.defaultCar = this.cars[0]
            })
        },
        createOffer() {
            console.log(this.offer);
            this.cars.forEach(car=> {
                console.log(car)
            })
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