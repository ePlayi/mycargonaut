<template>
    <v-container id="main-container" align="center">
        <v-card class="profile-container" rounded="4" color="whitesmoke">
          <v-row justify="center" align="center">
              <v-col class="profile-pic-name" sm="8" cols="12" align="start" justify="start">
                      <v-avatar size="130px" class="ma-8">
                          <v-img :src="user.profilePicture" cover></v-img>
                      </v-avatar>
                      <div>
                        <!-- Loginname -->
                        <h1 class="ml-4">{{ user.loginname }}</h1>
                        <!-- Echter Name -->
                        <span class="ml-4">{{user.name}} {{user.nachname}}, erreichbar unter {{user.mobilenr}}</span>
                      </div>
              </v-col>
              <v-col lg="4" cols="12">
                  <v-icon class="mx-2" icon="fas fa-star" color="orange" size="large"/>
                  <v-icon class="mx-2" icon="fas fa-star" color="orange" size="large"/>
                  <v-icon class="mx-2" icon="fas fa-star" color="orange" size="large"/>
                  <v-icon class="mx-2" icon="fas fa-star" color="orange" size="large"/>
                  <v-icon class="mx-2" icon="fas fa-star" color="orange" size="large"/>
              </v-col>
          </v-row>
        </v-card>

        <v-card class="more-card" rounded="4" style="margin-top: 30px">
          <v-tabs
            v-model="tab"
            bg-color="#83b8b8"
          >
            <v-tab value="comments">Bewertungen</v-tab>
            <v-tab value="cars">Fahrzeuge</v-tab>
            <!-- <v-tab value="three">Informationen</v-tab> -->
            <v-tab value="edit">Profil Bearbeiten</v-tab>
            <v-spacer></v-spacer>
            <v-tab value="currency">Finanzen</v-tab>
            <!-- <button class="btn btn-primary" @click="updateCurrencyModal=true">Kontostand</button> -->
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="comments">
                <v-card class="comment-card" rounded="4" elevation="0">
                  <v-card-text v-if="comments.length===0">
                    <h5>Dieser Benutzer hat noch keine Kommentare erhalten</h5>
                  </v-card-text>
                  <v-card-text v-for="comment in comments" :key="comment">
                    <v-card color="grey lighten-4" rounded="3">
                      <v-card-text class="my-4">
                        <v-row justify="center" align="center">
                          <v-col cols="12" sm="2" justify="center" align="center">
                            <v-row justify="center" align="center">
                              <v-avatar v-if="comment.customerImage !==''" size="80px" class="mx-8">
                                <v-img :src="comment.customerImage"></v-img>
                              </v-avatar>
                              <v-avatar v-if="comment.customerImage ===''" size="80px" class="mx-8">
                                <v-img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"></v-img>
                              </v-avatar>
                            </v-row>
                            <v-row justify="center" align="center">
                              <span class="mt-2">{{comment.customerName}}</span>
                            </v-row>
                          </v-col>
                          <v-col cols="6" align="start" justify="start">
                            <span>
                              "{{comment.comment}}"
                            </span>
                          </v-col>
                          <v-col cols="12" lg="4">
                            <v-icon class="mx-2" icon="fas fa-star" :color="comment.rating >= 1 ? 'orange' : '#cccccc'" size="large"/>
                            <v-icon class="mx-2" icon="fas fa-star" :color="comment.rating >= 2 ? 'orange' : '#cccccc'" size="large"/>
                            <v-icon class="mx-2" icon="fas fa-star" :color="comment.rating >= 3 ? 'orange' : '#cccccc'" size="large"/>
                            <v-icon class="mx-2" icon="fas fa-star" :color="comment.rating >= 4 ? 'orange' : '#cccccc'" size="large"/>
                            <v-icon class="mx-2" icon="fas fa-star" :color="comment.rating >= 5 ? 'orange' : '#cccccc'" size="large"/>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                  </v-card-text>

                </v-card>
              </v-window-item>

              <v-window-item value="cars">
                <button class="btn btn-success" @click="addCarModal=true">Hinzufügen</button>
                <v-row v-for="car in cars" :key="car" justify="center" align="center">
                  <v-col cols="12" sm="4">
                    <v-img :src="car.carImage" class="car-image"></v-img>
                    <button class="btn btn-warning" @click="openEditModal(car)">Bearbeiten</button>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h2>{{ car.brand }} {{ car.model }}</h2>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h4>Sitze: {{ car.seats }}</h4>
                    <h4>Tragfläche {{ car.storage }}</h4>
                  </v-col>
                </v-row>
              </v-window-item>

              <v-window-item value="edit">
        <p>Profil bearbeiten</p>
        <div class="form-group">
          <label for="inputFirstname">Vorname</label>
          <input type="text" class="form-control" id="inputFirstname" placeholder="Vorname..." v-model="user.name">

          <label for="inputLastname">Nachname</label>
          <input type="text" class="form-control" id="inputLastname" placeholder="Nachname..." v-model="user.nachname">

          <label for="inputMail">E-Mail Adresse</label>
          <input type="text" class="form-control" id="inputMail" placeholder="Mail..." v-model="user.email">

          <label for="inputMobileNr">Handynummer</label>
          <input type="text" class="form-control" id="inputMobileNr" placeholder="Handy..." v-model="user.mobilenr">

          <label for="inputBirthdate">Geburtsdatum</label>
          <input type="date" class="form-control" id="inputBirthdate" placeholder="Datum" v-model="user.birthdate">

          <label for="inputGender">Geschlecht</label>
          <input type="text" class="form-control" id="inputGender" placeholder="Geschlecht..." v-model="user.gender">

          <label for="inputAddress">Addresse</label>
          <input type="text" class="form-control" id="inputAddress" placeholder="Addresse..." v-model="user.address">

          <label for="inputPicture">Profilbild</label>
          <input type="text" class="form-control" id="inputPicture" placeholder="Bild URL..." v-model="user.profilePicture">

          <label for="inputDescription">Beschreibung</label>
          <textarea type="text" class="form-control" rows="3" id="inputDescription" v-model="user.description"></textarea>

        </div>
        <button type="button" class="btn btn-primary" @click="saveEditProfile(this.user)">Speichern</button>
              </v-window-item>

              <v-window-item value="currency">
            <div class="form-group mb-5">
              <h2>Aktueller Kontostand: <span style="color: #83b8b8">{{user.currency}}</span> Coins</h2>
              <hr>
              <h3 class="text-center">Aufladen</h3>
              <label for="inputCurrency">Menge</label>
              <input type="number" class="form-control" id="inputCurrency" placeholder="Menge" v-model="addCurrency">
            </div>
            <button class="btn btn-success" @click="updateCurrency(this.addCurrency)">Ändern</button>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
    </v-container>
  
    <!--MODAL TO EDIT CAR-->
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="editCarModal" @close="editCarModal = false">
      <template #header>
        <p>Fahrzeug bearbeiten</p>
        <button class="btn btn-secondary" style="text-align: right" @click="editCarModal = false;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </template>
      <template #body>
        <p>{{editBrand}} - {{editModel}}</p>
        <div class="form-group">
          <label for="inputSeats">Sitze</label>
          <input type="text" class="form-control" id="inputSeats" placeholder="Sitze..." v-model="editSeats">

          <label for="inputStorage">Stauraum</label>
          <input type="text" class="form-control" id="inputStorage" placeholder="Stauraum..." v-model="editStorage">
        </div>
      </template>
      <template #footer>
        <button type="button" class="btn btn-primary" @click="saveEditVehicel()">Speichern</button>
        <button type="button" class="btn btn-danger" @click="deleteCar(editCardId)">Löschen</button>
      </template>
    </modal>
  </Teleport>

  <!--MODAL TO ADD CAR-->
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="addCarModal" @close="addCarModal = false">
      <template #header>
        <p>Fahrzeug hinzufügen</p>
        <button class="btn btn-secondary" style="text-align: right" @click="addCarModal = false;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </template>
      <template #body>
        <div class="form-group">
          <label for="addBrandInput">Marke</label>
          <input type="text" class="form-control" id="addBrandInput" placeholder="Marke..." v-model="addBrand">

          <label for="addModelInput">Modell</label>
          <input type="text" class="form-control" id="addModelInput" placeholder="Modell..." v-model="addModel">

          <label for="addSeatsInput">Sitze</label>
          <input type="text" class="form-control" id="addSeatsInput" placeholder="Sitze..." v-model="addSeats">

          <label for="addStorageInput">Stauraum</label>
          <input type="text" class="form-control" id="addStorageInput" placeholder="Stauraum..." v-model="addStorage">

          <label for="addImageInput">Bild</label>
          <input type="text" class="form-control" id="addImageInput" placeholder="Bild URL..." v-model="addImage">

        </div>
      </template>
      <template #footer>
        <button type="button" class="btn btn-primary" @click="addCar()">Speichern</button>
        <button type="button" class="btn btn-danger" @click="deleteCar(editCardId)">Löschen</button>
      </template>
    </modal>
  </Teleport>
</template>


<script>
import Modal from "@/components/Modal";
export default {
  name: "Profile",
  created() {
    document.title = "Profil";
  },
  components:{
    Modal
  },
  mounted() {

  },
  beforeMount() {
    this.getProfileInformation()
    this.getCars()
    this.getComments()
  },
  data() {
    return {
      //IF LOCAL TESTED USE THIS URL FOR THE API CALLS
      url: 'http://localhost:3001/',
      // url: 'https://mycargonaut.onrender.com/',

      user:{},
      cars:[],
      comments:[],
      editProfileModal: false,
      tab: null,

      //everything to edit user profile
      editFirstname: "",
      editLastname: "",
      editMail: "",
      editMobileNr: "",
      editBirthdate:"",
      editGender: "",
      editAddress: "",
      editPicture: "",
      editDescription: "",

      addCurrency:0,
      updateCurrencyModal:false,


      //for adding
      addCarModal:false,
      addCardId:"",
      addBrand:"",
      addModel:"",
      addSeats:"",
      addStorage:"",
      addImage:"",

      //for editing
      editCarModal:false,
      editCardId:"",
      editBrand:"",
      editModel:"",
      editSeats:"",
      editStorage:""
    }
  },
  methods:{
    updateCurrency(){
      this.axios.request({
        method: 'PUT',
        url: this.url+'currency',
        data: {
          change: this.addCurrency,
          reason: 'topUp'
        }
      })
          .then((response)=>{
            if (response.status){
              this.getProfileInformation()
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    saveEditProfile(user){
      this.axios.request({
        method: 'PUT',
        url: this.url+'profile',
        data: {
          user
        }
      })
          .then((response)=>{
            if (response.status){
              this.getProfileInformation()
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    getProfileInformation(){
      this.axios.get(this.url+'profile',{
      })
          .then((response) => {
            this.user = response.data.user
          })
    },
    openEditModal(car){
      this.editCarId=car.vehicleId
      this.editBrand=car.brand
      this.editModel=car.model
      this.editSeats=car.seats
      this.editStorage=car.storage

      //open Modal
      this.editCarModal=true
    },
    saveEditVehicel(){
      this.axios.request({
        method: 'PUT',
        url: this.url+'vehicles',
        data: {
          seats: this.editSeats,
          storage: this.editStorage,
          vehicleId: this.editCarId
        }
      })
          .then((response)=>{
            if (response.status){
              this.getCars()
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    getCars(){
      this.axios.get(this.url+'profile/vehicles',{
      })
          .then((response) => {
            this.cars = response.data.vehicleList
          })
    },
    deleteCar(){
      this.axios.delete(this.url+'vehicles/'+this.editCarId,{
      })
          .then(() => {
            this.getCars()
          })
    },
    addCar(){
      this.axios.request({
        method: 'POST',
        url: this.url+'vehicles',
        data: {
          brand: this.addBrand,
          model: this.addModel,
          seats: this.addSeats,
          storage: this.addStorage,
          image: this.addImage

        },
      })
          .then(()=> {
            this.getCars()
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    getComments(){
      this.axios.get(this.url+'profile/ratings',{
      })
          .then((response) => {
            this.comments = response.data.ratingList.filter(comment => comment.rating !== null)
            console.log(this.comments)
          })
    },
  }
}

</script>

<style scoped>
.user-description-box{
  background-color: white;
  border-radius: 1rem;
  min-height: 200px;
  width: 100%;
  padding: 1rem;
}
.car-description-box{
  background-color: white;
  border-radius: 1rem;
  min-height: 200px;
  width: 100%;
  padding: 1rem;
}
.profile-picture{
  height: 150px;
  width: 150px;
  border-radius: 50%;

}
.comment-image{
  max-height: 100px;
  max-width: 100px;
  object-fit: contain;
}
.commentbox{
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  padding: 1rem;
}







.profile-container {
    max-width: 1000px;
    margin-top: 1vh;
}

.comment-card {
  max-width: 1000px;
}

.more-card {
  max-width: 1000px;
}

.profile-pic-name {
    display: flex;
    align-items: center;
}

.car-image {
    margin: 10px;
    border-radius: 10px;
    min-width: 100px;
    width: 150px;
}

@media only screen and (max-width: 1279px) {
    .profile-pic-name {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>
