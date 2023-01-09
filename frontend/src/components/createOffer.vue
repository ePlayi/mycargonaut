<template>
    <v-container align="center">
        <!-- Angebot anlegen -->
        <v-card rounded="4" style="max-width: 1300px">
            <v-card-title justify="center" align="center">
                Jetzt dein Angebot listen!
            </v-card-title>
        </v-card>

        <v-card rounded="4" v-if="cars.length!==0" class="my-8 content-card">
            <v-card-text align="center">
                Du hast leider noch keine Autos registriert.
                Unter <router-link to="profile">Meine Fahrzeuge</router-link> kannst du dein erstes Auto anlegen.
            </v-card-text>
        </v-card>

        <v-card rounded="4" class="my-8 content-card" v-if="cars.length>0">
            <v-card-text>
                <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="login-form">
                    <v-container>
                        <v-select
                        v-model="currentCar"
                        :items="carNames"
                        item-title="carname"
                        item-value="vehicleId"
                        label="Select"
                        return-object
                        single-line
                        :rules="requiredRule"
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
                                :rules="requiredRule"
                                required
                            ></v-text-field>
                            </v-col>

                            <v-col
                            cols="12"
                            sm="6"
                            >
                            <v-text-field
                                v-model="offer.destination"
                                label="Ankunftsort"
                                type="text"
                                :rules="requiredRule"
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
                                :rules="requiredRule"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-btn color="green" @click="createOffer()">Angebot machen</v-btn><v-btn
                                    color="success"
                                    class="mr-4"
                                    @click="validate"
                                    >
                                    Validate
                                    </v-btn>
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
        this.getProfileInformation()
    },
    created() {
        document.title = "Angebot anlegen";
    },
    data() {
        return {
            //IF LOCAL TESTED USE THIS URL FOR THE API CALLS
            //url: 'http://localhost:3001/',
            url: 'https://mycargonaut.onrender.com/',
            offer: {
                driverId: 0,
                vehicleId: 0,
                start: "",
                destination: "",
                dateTime: "",
                price: 0,
                description: "",
            },
            valid: true,
            cars: [],
            currentCar: null,
            carNames: [],
            user: null,
            rules: [v => v.length <= 128, v => !!v || 'Required. Max 128 characters, everything after will be cut off'],
            requiredRule: [v => !!v || 'This field is required'],
        };
    },
    methods: {
        async validate () {
        const { valid } = await this.$refs.form.validate()
        if (valid) return true
        else return false
      },
        getCars(){
        this.axios.get(this.url+'profile/vehicles',{
        })
            .then((response) => {
                this.cars = response.data.vehicleList
                this.cars.forEach(car => {
                    const newCar = {
                        carname: car.brand + " " + car.model,
                        vehicleId: car.vehicleId,
                    }
                    this.carNames.push(newCar)
                })
                this.offer.vehicleId = this.carNames[0].vehicleId
            })
        },
        getProfileInformation(){
        this.axios.get(this.url+'profile',{
        })
            .then((response) => {
                this.user = response.data.user
            })
        },
        createOffer() {
            if(!this.validate()) return
            this.cars.forEach(car => {
                if (car.vehicleId === this.currentCar.vehicleId) {
                    this.offer.vehicleId = car.vehicleId
                }
            })
            this.offer.dateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            this.offer.driverId = this.user.uId
            this.axios.post(this.url+'rides', this.offer)
                .then((response) => {
                    console.log(response)
                    this.$router.push('/offers')
                })
                .catch(function (error) {
                    console.log(error);
                });
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
