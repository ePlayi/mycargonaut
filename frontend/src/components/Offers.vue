<template>
  <v-container class="card-container">
    <v-card rounded="4" class="filter-card">
      <v-card-title>
        <h2>Filter</h2>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              class="mb-4 mt-1"
              label="Suche nach Stadt"
              v-model="search.city"
              single-line
              hide-details
              @input="filterRides();"/>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              class="mb-4 mt-1"
              label="Mindestanzahl der Sitze"
              v-model="search.seats"
              single-line
              hide-details
              @input="filterRides();"/>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              class="mb-4 mt-1"
              label="Mindestvolumen des Stauraums"
              v-model="search.volume"
              single-line
              hide-details
              @input="filterRides();"/>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="offer-card my-10" rounded="5" v-for="ride in filteredRides" :key="ride" justify="center" align="center">
      <v-row v-if="ride.open" no-gutters style=" word-break: break-word;" justify="center" align="center">
        <v-col class="offer-card-col mt-2" cols="12" color="grey">
          <h2>{{ride.start}} &#8594; {{ride.destination}}</h2>
        </v-col>
        <v-col class="offer-card-col" cols="12" md="4">
          <router-link :to="{ name: 'profile', query: {id: ride.driverId }}">
            <img
                :src="ride.driverImage"
                style="width: 100px; height: 100px; border-radius: 50%;"
                class="ma-4">
          </router-link>
          Fahrer: {{ride.driverName}}
        </v-col>
        <v-col class="offer-card-col" cols="12" md="3">
          Abfahrt am {{ride.dateTime}}
        </v-col>
        <v-col class="offer-card-col" cols="12" md="2">
          <h4>Preis: {{ride.price}} Coins</h4>
        </v-col>
        <v-col class="offer-card-col" cols="12" md="3">
          <v-btn color="green" @click="dialog.open = true; dialog.ride = ride; getOffers()">Angebot ansehen</v-btn>
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
        <p v-if="dialog.ride.description">{{dialog.ride.description}}</p>
        <p v-else>Der Fahrer hat keine Beschreibung angegeben.</p>
        <hr>
        <h5>Fahrzeuginfos</h5>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="4">
            <b>Sitzplätze: {{dialog.ride.vehicleSeats}}</b>
          </v-col>
          <v-col cols="12" sm="4">
            <b>Volumen: {{dialog.ride.vehicleStorage}}</b>
          </v-col>
          <v-col cols="12" sm="4">
            <v-img
            :src="dialog.ride.vehicleImage"
            ></v-img>
          </v-col>
        </v-row>
        <hr>
      </v-card-text>
      <v-card-actions>
        <v-btn color="green"
               :disabled="dialog.ride.driverId === this.user.uId||booking_rideIds.includes(dialog.ride.rideId)"
               @click="bookOrder(dialog.ride.rideId, dialog.ride.price, dialog.ride.driverId)">Jetzt für {{ dialog.ride.price }} Coins buchen</v-btn>
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
      filteredRides: [],
      singleRide: [],
      search: {
        city: "",
        seats: "",
        volume: "",
      },
      user: {},
      booking_rideIds:[],
      sliderSeats: 50,
      possibleSeats: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'],
    }
  },
  beforeMount() {
    this.getAllRides()
    this.getProfileInformation()
    this.getBookedRides()
  },
  methods:{
    filterRides() {
      this.filteredRides = this.rides.filter(ride => {
        return (ride.start.toLowerCase().includes(this.search.city.toLowerCase()) ||
            ride.destination.toLowerCase().includes(this.search.city.toLowerCase())) &&
            ride.vehicleSeats >= this.search.seats &&
            ride.vehicleStorage >= this.search.volume
      })
    },
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
    getOffers() {
      console.log(this.user)
      console.log(this.dialog.ride)
    },
    getProfileInformation(){
      this.axios.get(this.url+'profile',{
      })
          .then((response) => {
            this.user=response.data.user
            console.log(this.user)
          })
    },
    getBookedRides(){
      this.axios.get(this.url+'bookedRides',{
      })
          .then((response) => {
            this.booking_rideIds=response.data.booking_rideIds
          })
    },
    getAllRides(){
      this.axios.get(this.url+'rides',{
      })
          .then((response) => {
            this.rides=response.data.rideList
            this.filteredRides = this.rides
            console.log(this.rides)
          })
    },
    getSingleRide(){
      this.axios.get(this.url+'rides',{
      })
          .then((response) => {
            this.singleRide=response.data.ride
            console.log(response.data)
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
  max-height: 200px;
}

.offer-card-col {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
}
.car-image{
  max-width: 50vw;
  height: auto;
}
.dialog-card {
}

@media only screen and (max-width: 960px) {
  .card-container {
    max-width: 70%;
    min-width: 400px;
  }

  .offer-card {
    max-height: 600px;
  }
}
</style>
