<template>
    <v-container class="card-container">
        <v-card class="my-10" rounded="5" v-for="ride in rides" :key="ride">
          <v-row v-if="ride.open" no-gutters class="offer-card ma-8" justify="center" align="center" style=" word-break: break-word;">
            <v-col class="offer-card-col" cols="12">
              <h2>{{ride.start}} &#8594; {{ride.destination}}</h2>
            </v-col>
            <v-col class="offer-card-col" cols="12" md="4">
              <router-link :to="{ name: 'profile', query: {id: ride.driverId }}">
                <img
                :src="ride.driverImage"
                style="width: 100px; height: 100px; border-radius: 50%;"
                class="ma-4">
              </router-link>
            </v-col>
              <section>
              Fahrer: {{ride.driverName}}
              </section>

            <v-col class="offer-card-col" cols="12" md="3">
              Abfahrt am {{ride.dateTime}}
            </v-col>
            <v-col class="offer-card-col" cols="12" md="2">
              <h4>Preis: {{ride.price}} Coins</h4>
            </v-col>
            <v-col class="offer-card-col" cols="12" md="3">
              <v-btn color="green" @click="getOffers(); dialog.open = true; dialog.ride = ride">Angebot ansehen</v-btn>
            </v-col>
          </v-row>
        </v-card>
    </v-container>

    <v-dialog
      v-model="dialog.open"
      width="500">
      <v-card class="dialog-card">
        <v-card-text>
          <h5>Beschreibung</h5>
          {{dialog.ride.description}}
        </v-card-text>
        <v-card-text>
          <h5>Fahrzeug</h5>
          {{dialog.ride.vehicleImage}}
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" :disabled="dialog.ride.driverId === this.user.uId" @click="bookOrder(dialog.ride.rideId, dialog.ride.price, dialog.ride.driverId)">Jetzt für {{ dialog.ride.price }} Coins buchen</v-btn>
          <v-btn color="red" @click="dialog.open = false;">Schließen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>


<script>
export default {
  name: "Offers",
  created () {
    document.title = "Alle Angebote";
  },
  data(){
    return{
      dialog: {
        open: false,
        ride: null,
        user:{},
      },
      //IF LOCAL TESTED USE THIS URL FOR THE API CALLS
      url: 'http://localhost:3001/',
      //url: 'https://mycargonaut.onrender.com/',

      rides: [],
    }
  },
  beforeMount() {
    this.getAllRides()
    this.getProfileInformation()
  },
  methods:{
    bookOrder(id, price, driverId){
      this.axios.request({
        method: 'POST',
        url: this.url+'bookings',
        data: {
          rideId:id
        },
      })
        .then(() => {
          this.updateCurrency(price, driverId)
        })
        .catch(function (error) {
          console.log(error);
        });
      },
    updateCurrency(price, offerer) {
      this.axios.request({
        method: 'PUT',
        url: this.url+'currency',
        data: {
          change: price,
          reason: 'booking',
          offerer: offerer
        }
      })
          .then((response)=>{
            if (response.status===203){
              alert("Nicht genügend Coins")
            }
            if (response.status===200){
              alert("Anfrage gesendet")
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    async getOffers() {
      console.log("Function called")
    },
    getProfileInformation(){
      this.axios.get(this.url+'profile',{
      })
          .then((response) => {
            this.user=response.data.user
          })
    },
    getAllRides(){
      this.axios.get(this.url+'rides',{
      })
          .then((response) => {
            this.rides=response.data.rideList
            console.log(this.rides)
          })
    },
  }
}
</script>

<style scoped>

.card-container{
  max-width: 1000px;
}
.offer-card{
  background-color: white;
  border-radius: 1rem;
}

.offer-card-col {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
}

.dialog-card {
}

@media only screen and (max-width: 960px) {
  .card-container {
    max-width: 70%;
    min-width: 400px;
  }
}
</style>
