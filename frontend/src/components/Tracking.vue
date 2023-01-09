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


  <!-- <div v-if="activeRide===true">
    <h1 class="text-center">Lassen Sie diesen Screen aktiv, damit die Position getrackt werden kann</h1>
    <h2>Sie haben folgende Fahrt aktiv:</h2>
    <div>
      <p>{{activeRides.customerName}} - {{activeRides.start}}->{{activeRides.destination}}</p>
    </div>

    <button class="btn btn-primary" @click="changeStatusTo(this.activeRideId, 5)">Fahrt abschließen</button>
  </div> -->

  <div v-if="activeRide===true">
    <v-container class="tracking-container" align="center" justify="center">
      <v-card rounded="4">
        <v-card-text class="mt-4">
          <h2>Startpunkt: {{activeRides.start}} - Ziel: {{activeRides.destination}}</h2>
          <div>
            <p></p>
          </div>

          <b style="color: red">Lassen Sie diesen Screen aktiv, damit die Position getrackt werden kann</b>
        </v-card-text>
          <v-btn
          class="my-8"
            color="red"
            @click="changeStatusTo(this.activeRideId, 5)"
            >Fahrt abschließen</v-btn
          >
      </v-card>
    </v-container>
  </div>

  <div v-if="activeRide===false">
    <v-container class="tracking-container" align="center" justify="center">
      <v-card v-if="bookings.length===0 && accepted.length===0" rounded="4">
        <v-card-title>
          Zur Zeit hast du keine offenen Buchungen oder Fahrten
        </v-card-title>
      </v-card>

      <v-card v-if="bookings.length>0" rounded="4">
        <v-card-title>
          Wähle eine Fahrt aus, die du tracken möchtest
        </v-card-title>
        <v-card-text>
          <v-select
            class="ma-8"
            label="Fahrt auswählen"
            :items="trackableBookings"
            :v-model="selectedBooking"
            :item-text="name"
            :item-value="name"
          ></v-select>
        </v-card-text>
      </v-card>

      <v-card rounded="4" class="my-8" v-if="accepted.length>0">
        <v-card-title>
          Wähle eine Fahrt aus, die du starten möchtest
        </v-card-title>
        <v-card-text>
          <v-row class="ma-4">
            <v-col cols="12" sm="9">
              <v-select
                v-model="currentAccepted"
                :items="acceptedNames"
                item-title="acceptedName"
                item-value="rideId"
                label="Fahrt auswählen"
                return-object
                single-line
              ></v-select>
            </v-col>
            <v-col cols="12" sm="3">
              <v-btn
                color="green"
                @click="changeStatusTo(currentAccepted.rideId, 4)"
                >Los gehts!</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>

  <div v-if="(activeRide===false && trackableBookings.length>0) || (activeRide===true)">
    <v-container class="tracking-container">
      <v-card rounded="4" style="margin: 0; padding: 0">
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
      </v-card>
    </v-container>
  </div>


<!-- <div v-if="activeRide===false">
  <h3 class="text-center">Aktiv Trackbare Fahrten</h3>
  <select class="form-select" v-model="activeSelected" @change="getPos()">
    <option v-for="booking in trackableBookings" :key="booking" @click="activeSelected=booking.rideId">{{booking.rideId}} : {{booking.start}}-{{booking.destination}}</option>
  </select>

  <h3 class="text-center">Offene akzeptierte Fahrten</h3>
  <select class="form-select" v-model="selectAccepted">
    <option v-for="acc in accepted" :key="acc" :value="acc.rideId">{{acc.customerName}} : {{acc.start}}-{{acc.destination}}</option>
  </select>

  <p>Fahrt für {{selectAccepted}} beginnen <button class="btn btn-primary" @click="changeStatusTo(selectAccepted, 4)">Los gehts!</button></p>

</div>

  <hr> -->
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
    setInterval(()=>{
      if (this.activeRide===true){
        console.log("Interval triggered")
        this.getOwnPos()
        this.updateLocation(this.activeRideId)
      }
    }, 5000)
  },
  beforeMount() {
    this.getBookings()
    this.getOwnPos()
    this.getAcceptedRides()
    this.getActiveRide()
  },
  data() {
    return {
      //IF LOCAL TESTED USE THIS URL FOR THE API CALLS
      //url: 'http://localhost:3001/',
      url: 'https://mycargonaut.onrender.com/',

      activeSelected:{},
      selectAccepted:null,
      activeRide: false,

      //entry zoomlevel
      zoom: 8,
      //edit this to get other positions on the map. Its centered to this position and the marker uses the same value
      position: [0,0],
      ride:{},

      long:0,
      lat: 0,

      bookings:[],
      bookingNames:[],
      currentBooking: null,

      accepted:[],
      acceptedNames:[],
      currentAccepted: null,

      activeRides: {},
      activeRideId:0,
    }
  },
  computed:{
    trackableBookings: function (){
      return this.bookings.filter(i => i.status === 4)
    }
  },
  methods:{
    getActiveRide(){
      this.axios.get(this.url+'activeRides',{
      })
          .then((response) => {
            this.activeRides=response.data.activeRides
            if (this.activeRides===undefined) {
              this.activeRide=false
              return
            }
            this.activeRideId = this.activeRides.rideId
            this.activeRide=true

          })
    },
    updateLocation(){
      this.axios.request({
        method: 'PUT',
        url: this.url+'updatePos',
        data: {
          rideId: this.activeRideId,
          long: this.long,
          lat: this.lat
        }
      })
          .then(function(response){
            if (response.status){
              console.log("still driving")
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    changeStatusTo(id, changeTo){
      this.axios.request({
        method: 'PUT',
        url: this.url+'changeStatusRide',
        data: {
          id:id,
          changeTo: changeTo
        }
      })
          .then(()=>{
            //FUCKIT ICH RELOADE DIE PAGE HUSO
            //^lol
            window.location.reload()
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    getAcceptedRides(){
      this.axios.get(this.url+'ridesAccepted',{
      })
          .then((response) => {
            this.accepted=response.data.acceptedList
            this.accepted.forEach(accepted => {
              const newAccepted = {
                acceptedName: accepted.customerName + " : " + accepted.start + "-" + accepted.destination,
                rideId: accepted.rideId,
              }
              this.acceptedNames.push(newAccepted)
            })
            console.log(this.accepted)
            console.log(this.acceptedNames)
          })
    },
    getOwnPos(){
      navigator.geolocation.getCurrentPosition((location)=> {
        this.long = location.coords.longitude
        this.lat = location.coords.latitude
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
      this.axios.get(this.url+'profile/bookings',{
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
.tracking-container {
    max-width: 1000px;
}

.delivery-icon {
    border: 4px solid black;
}
.map-box{
  height: 40vh;
  max-width: 100%;
}
</style>
