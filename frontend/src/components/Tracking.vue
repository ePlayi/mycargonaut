<template>
  <!--
    <v-container class="mt-16" align="center">
        <v-card class="tracking-card" rounded="4">
            <v-select
            class="ma-8"
            label="Packet auswählen"
            :items="packagesNameList"
            :v-model="selectedPackage"
            :item-text="name"
            :item-value="name"

            ></v-select>
            <v-card-title class="ma-8">
                <h1>Das PACKETNAME ist: STATUS</h1>
            </v-card-title>
            <v-row class="mx-8 my-16">
                <v-col lg="4" xs="12">
                    <div
                    class="pa-6 rounded-circle d-inline-block delivery-icon"
                    >
                        <v-icon
                        class="ma-4"
                        color="green"
                        size="100"
                        >
                            fas fa-box
                        </v-icon>
                    </div>
                    <h2 class="mt-6">In Bearbeitung</h2>
                </v-col>
                <v-col lg="4" xs="12">
                    <div class="pa-6 rounded-circle d-inline-block delivery-icon">
                        <v-icon
                        class="ma-4"
                        color="green"
                        size="100"
                        >
                            fas fa-truck
                        </v-icon>
                    </div>
                    <h2 class="mt-6">Versendet</h2>
                </v-col>
                <v-col lg="4" xs="12">
                    <div class="pa-6 rounded-circle d-inline-block delivery-icon">
                        <v-icon
                        class="ma-4"
                        color="red"
                        size="100"
                        >
                            fas fa-check
                        </v-icon>
                    </div>
                    <h2 class="mt-6">Angekommen</h2>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
-->
  <h3 class="text-center">Offene Fahrten</h3>
  <select class="form-select" v-model="activeSelected" @change="getPos()">
    <option v-for="booking in bookings" :key="booking" @click="activeSelected=booking.rideId">{{booking.rideId}} - {{booking.status}}</option>
  </select>
  <hr>
  <div class="map-box">
    <l-map ref="map" v-model:zoom="zoom" :center=position :maxZoom=18>
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"

      >
      </l-tile-layer>
      <l-marker :lat-lng=position>

      </l-marker>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker  } from "@vue-leaflet/vue-leaflet";

export default {
  name: "Tracking",
  created() {
    document.title = "Tracking";
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,

  },
  mounted() {

  },
  beforeMount() {
    this.getBookings()
    this.getOwnPos()
  },
  data() {
    return {
      //IF LOCAL TESTED USE THIS URL FOR THE API CALLS
      url: 'http://localhost:3001/',
      // url: 'https://mycargonaut.onrender.com/',

      activeSelected:{},

      //entry zoomlevel
      zoom: 8,
      //edit this to get other positions on the map. Its centered to this position and the marker uses the same value
      position: [0,0],
      ride:{},

      bookings:[],
    }
  },
  methods:{
    getOwnPos(){
      navigator.geolocation.getCurrentPosition((location)=> {
        console.log(location.coords.latitude);
        console.log(location.coords.longitude);
        console.log(location.coords.accuracy);
        this.position=[location.coords.latitude, location.coords.longitude]
      });
    },
    getPos(){
      this.axios.get(this.url+'rides/'+this.activeSelected,{
      })
          .then((response) => {

            this.ride=response.data.ride
            this.position=[this.ride.posLatitude, this.ride.posLongitude]

            console.log(this.position)

          })
    },
    getBookings(){
      this.axios.get(this.url+'customers/bookings',{
      })
          .then((response) => {
            this.bookings=response.data.bookingList
            console.log(this.bookings)
          })
    }
  }
}

</script>

<style scoped>
.tracking-card {
    max-width: 1300px;
}

.delivery-icon {
    border: 4px solid black;
}
.map-box{
  height: 30vh;
  width: 100vw;
  max-width: 100rem;
}
</style>
