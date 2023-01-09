<template>
  <div class="navbar">
    <div class="row">
      <div class="col-2">
        <router-link to="/" class="nav-item"><i class="fa-solid fa-house"></i></router-link>
      </div>
      <div class="col-2">
        <router-link to="/tracking" class="nav-item" style="position: relative"><i class="fa-solid fa-map-location-dot"></i></router-link>
      </div>
      <div class="col-2">
        <router-link to="/profile" class="nav-item"><i class="fa-solid fa-user"></i></router-link>
      </div>
      <div class="col-2">
        <router-link to="/chats" class="nav-item"><i class="fa-solid fa-comment"></i></router-link>
      </div>
      <div class="col-2">
        <a class="nav-item" @click="settingsModal=true"><i class="fa-solid fa-bars"></i></a>
      </div>
    </div>
  </div>



  <!--MODAL FOR SETTINGS-->
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="settingsModal" @close="settingsModal = false">
      <template #header>
        <p>Einstellungen</p>
        <button class="btn btn-secondary" style="text-align: right" @click="settingsModal = false;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </template>
      <template #body>
        <div class="row">
          <div class="col mb-5">
            <button class="btn btn-danger" @click="logout()">Logout</button>
          </div>
          <div class="col mb-5">
            <button class="btn btn-warning" @click="settingsModal=false; changePassModal=true">Passwort ändern</button>
          </div>
          <div class="col mb-5">
            <button class="btn btn-dark" @click="settingsModal=false; acceptDeclineModal=true">Anfragen</button>
          </div>
          <div class="col mb-5">
            <button class="btn btn-dark" @click="settingsModal=false; rateDriverModal=true">Bewerten</button>
          </div>
        </div>

      </template>
      <template #footer>
        <!--Empty <p> to get rid of template from modal-->
        <p></p>
      </template>
    </modal>
  </Teleport>

<!--MODAL TO CHANGE PASSWORD-->
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="changePassModal" @close="changePassModal = false">
      <template #header>
        <p>Passwort ändern</p>
        <button class="btn btn-secondary" style="text-align: right" @click="changePassModal = false;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </template>
      <template #body>
        <div class="form-group mb-5">
          <label for="inputEditPassword">Password</label>
          <input type="password" class="form-control" id="inputEditPassword" placeholder="Password" v-model="newPassword">
        </div>
        <div class="form-group">
          <label for="inputEditPasswordConfirm">Password erneut eingeben</label>
          <input type="password" class="form-control" id="inputEditPasswordConfirm" placeholder="Password erneut eingeben" v-model="newPasswordConfirm">
        </div>
      </template>
      <template #footer>
        <button class="btn btn-success" @click="changePassword(this.newPassword)">Ändern</button>
      </template>
    </modal>
  </Teleport>

  <!--MODAL TO ACCEPT/DECLINE BOOKINGS-->
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="acceptDeclineModal" @close="acceptDeclineModal = false">
      <template #header>
        <p>Anfragen</p>
        <button class="btn btn-secondary" style="text-align: right" @click="acceptDeclineModal = false;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </template>
      <template #body>
        <select class="form-select" v-model="activeSelected">
          <option v-for="request in requests" :key="request" :value="request.bookingId">{{request.customerName}} {{offerer = request.customerId}} : {{request.start}}-{{request.destination}} {{price=request.price}}</option>
        </select>
        <button class="btn btn-success" @click="changeStatusTo(2)">Annehmen</button>
        <button class="btn btn-warning" @click="changeStatusTo(3)">Ablehnen</button>
      </template>
      <template #footer>
        <p></p>
      </template>
    </modal>
  </Teleport>

  <!--MODAL TO RATE DRIVER-->
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="rateDriverModal" @close="rateDriverModal = false">
      <template #header>
        <p>Bewerten</p>
        <button class="btn btn-secondary" style="text-align: right" @click="rateDriverModal = false;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </template>
      <template #body>
        <select class="form-select" v-model="selectedBooking">
          <option v-for="rate in rateables" :key="rate" :value="rate.bookingId">{{rate.driverName}} {{rateDriverId = rate.driverId}} : {{rate.start}}-{{rate.destination}}</option>
        </select>
        <div class="form-group">
          <label for="ratingValinput">Rating</label>
          <input type="number" class="form-control" id="ratingValinput" placeholder="Rating..."  v-model="ratingVal" min="1" max="5">
        </div>
        <div class="form-group">
          <label for="ratingCommentInput">Kommentar</label>
          <input type="text" class="form-control" id="ratingCommentInput" placeholder="Kommentar..."  v-model="ratingComment">
        </div>
      </template>
      <template #footer>
        <p></p>
      </template>
    </modal>
  </Teleport>




</template>

<script>
import Modal from "@/components/Modal"
export default {
  name: "Profile",
  components:{
    Modal
  },
  mounted() {

  },
  beforeMount() {
    this.getRequests()
    this.getRateable()
  },
  data() {
    return {
      settingsModal: false,
      changePassModal: false,
      rateDriverModal: false,

      newPassword:"",
      newPasswordConfirm:"",
      activeSelected:0,
      requests:[],
      acceptDeclineModal:false,
      price:0,
      offerer:0,

      rateables:[],
      selectedBooking:0,
      rateDriverId:0,
      ratingVal:0,
      ratingComment:'',



      //IF LOCAL TESTED USE THIS URL FOR THE API CALLS
      //url: 'http://localhost:3001/',

      url: 'https://mycargonaut.onrender.com/',
    }
  },
  methods:{
    sendRating(){
      this.axios.request({
        method: 'PUT',
        url: this.url+'sendRating',
        data: {
          rating: this.ratingVal,
          comment: this.ratingComment,
          bookingId: this.selectedBooking,
        }
      })
          .then(()=>{
            this.getRateable()
            this.updateDriverRating()
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    updateDriverRating(){
      this.axios.request({
        method: 'PUT',
        url: this.url+'updateUserRating',
        data: {
          driverId: this.rateDriverId,
        }
      })
          .then((response)=>{
            console.log(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    changeStatusTo(status){
      this.axios.request({
        method: 'PUT',
        url: this.url+'changeStatusRide',
        data: {
          rideid: this.activeSelected,
          changeTo: status
        }
      })
          .then((response)=>{
            if (response.data.changedTo===3){
              this.updateCurrency()
            }else{
              alert("Fahrt angenommen")
              this.getRequests()
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    updateCurrency() {
      this.axios.request({
        method: 'PUT',
        url: this.url+'currencyBack',
        data: {
          change: this.price,
          customer: this.offerer
        }
      })
          .then((response)=>{
            if (response.status===200){
              alert("Anfrage abgelehnt")
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    getRequests(){
      this.axios.get(this.url+'requestedRides',{
      })
          .then((response) => {
            this.requests=response.data.requestList
          })
    },
    getRateable(){
      this.axios.get(this.url+'rateable',{
      })
          .then((response) => {
            this.rateables=response.data.rateables
          })
    },


    changePassword(password){
      if (this.newPassword===this.newPasswordConfirm){
        this.axios.request({
          method: 'PUT',
          url: this.url+'password',
          data: {
            password
          }
        })
            .then(()=>{
              alert('Passwort erfolgreich geändert, loggen Sie sich bitte neu ein.')
              this.logout()
            })
            .catch(function (error) {
              console.log(error);
            });
      }else{
        alert("Passwört stimmen nicht überein")
        this.newPassword=""
        this.newPasswordConfirm=""
        document.getElementById('inputEditPassword').focus()
      }
    },
    logout(){
      event.preventDefault()
      this.axios.request({
        method: 'POST',
        url: this.url+'logout',
      })
          .then(function(){
            window.location.reload()
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    },
}

</script>

<style scoped>
/* Place the navbar at the bottom of the page, and make it stick */
.navbar {
  padding: 0 10px;
  background-color: #333;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 555;
}

/* Style the links inside the navigation bar */
.nav-item {
  color: #f2f2f2;
  width: 20vw;
  transition: all ease-in-out .1s;
  display: inline-block;
  text-align: center;
  padding: 14px 0;
}
/* Change the color of links on hover */
.nav-item:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.nav-item.active {
  background-color: #83b8b8;
  color: black;
  margin: 0 10px;
  transform: scale(1.2);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}


</style>
