<template>
  <div class="navbar">
    <router-link to="/" class="nav-item"><i class="fa-solid fa-house"></i></router-link>
    <router-link to="/tracking" class="nav-item" style="position: relative"><i class="fa-solid fa-map-location-dot"></i></router-link>
    <router-link to="/profile" class="nav-item"><i class="fa-solid fa-user"></i></router-link>
    <a class="nav-item" @click="settingsModal=true"><i class="fa-solid fa-bars"></i></a>
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
          <div class="col-6">
            <button class="btn btn-danger" @click="logout()">Logout</button>
          </div>
          <div class="col-6">
            <button class="btn btn-warning" @click="settingsModal=false; changePassModal=true">Passwort ändern</button>
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

  },
  data() {
    return {
      settingsModal: false,
      changePassModal: false,

      newPassword:"",
      newPasswordConfirm:"",

      //IF LOCAL TESTED USE THIS URL FOR THE API CALLS
      url: 'http://localhost:3001/',

      //url: 'https://mycargonaut.onrender.com/',
    }
  },
  methods:{
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
  background-color: #00564f;
  color: rgba(255, 255, 255, 0.68);
  margin: 0 10px;
  transform: scale(1.2);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}


</style>
