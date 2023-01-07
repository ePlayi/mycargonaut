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
          <!-- <v-row class="bottom-row">
              <v-col lg="6" cols="12">
                  <v-card class="ma-4" color="grey" rounded="4" width="90%" elevation="0" justify="center" align="center">
                      <h2 class="my-4">Über mich</h2>
                      <h5 class="my-4">Handynummer: {{user.mobilenr}}</h5>
                      <p v-if="user.gender">Geschlecht: {{user.gender}}</p>
                      <p v-if="user.birthdate">Geboren: {{user.birthdate}}</p>
                      <p v-if="user.adress">Adresse: {{user.adress}}</p>
                  </v-card>
              </v-col>
              <v-col lg="6" cols="12">
                  <v-card class="ma-4" color="grey" rounded="4" width="90%" elevation="0">
                      <h2 class="my-4">Meine Fahrzeuge</h2>
                      <v-row>
                          <v-col cols="4" v-for="car in cars" :key="car">
                              <v-img
                              class="car-image my-4"
                              aspect-ratio="1"
                              :src="car.carImage"
                              cover
                              />
                              <span>{{ car.brand }} {{ car.model }}</span>
                              <p>Sitze: {{ car.seats }}</p>
                              <p>Stauraum: {{ car.storage }}</p>
                          </v-col>
                          <v-col cols="4" v-for="car in cars" :key="car">
                              <v-img
                              class="car-image my-4"
                              aspect-ratio="1"
                              :src="car.carImage"
                              cover
                              />
                              <span>{{ car.brand }} {{ car.model }}</span>
                              <p>Sitze: {{ car.seats }}</p>
                              <p>Stauraum: {{ car.storage }}</p>
                          </v-col>
                      </v-row>
                  </v-card>
              </v-col>
          </v-row> -->
        </v-card>

        <v-card class="more-card" rounded="4" style="margin-top: 30px">
          <v-tabs
            v-model="tab"
            bg-color="grey lighten-4"
          >
            <v-tab value="comments">Bewertungen</v-tab>
            <v-tab value="cars">Fahrzeuge</v-tab>
            <!-- <v-tab value="three">Informationen</v-tab> -->
            <v-tab value="edit">Profil Bearbeiten</v-tab>
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
                <v-row v-for="car in cars" :key="car" justify="center" align="center">
                  <v-col cols="12" sm="4">
                    <v-img :src="car.carImage" class="car-image"></v-img>
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

              <v-window-item value="three">
                Three
              </v-window-item>

              <v-window-item value="edit">
        <p>Profil bearbeiten</p>
        <div class="form-group">
          <label for="inputFirstname">Vorname</label>
          <input type="text" class="form-control" id="inputFirstname" placeholder="Vorname..." v-model="user.name">

          <label for="inputLastname">Nachname</label>
          <input type="text" class="form-control" id="inputLastname" placeholder="Nachname..." v-model="user.nachname">

          <label for="inputMail">Mail</label>
          <input type="text" class="form-control" id="inputMail" placeholder="Mail..." v-model="user.email">

          <label for="inputMobileNr">Handy Nummer</label>
          <input type="text" class="form-control" id="inputMobileNr" placeholder="Handy..." v-model="user.mobilenr">

          <label for="inputBirthdate">Geburtsdatum</label>
          <input type="date" class="form-control" id="inputBirthdate" placeholder="Datum" v-model="user.birthdate">

          <label for="inputGender">Geschlecht</label>
          <input type="text" class="form-control" id="inputGender" placeholder="Geschlecht..." v-model="user.gender">

          <label for="inputAddress">Address</label>
          <input type="text" class="form-control" id="inputAddress" placeholder="Addresse..." v-model="user.address">

          <label for="inputPicture">Bild</label>
          <input type="text" class="form-control" id="inputPicture" placeholder="Bild URL..." v-model="user.profilePicture">

          <label for="inputDescription">Beschreibung</label>
          <textarea type="text" class="form-control" rows="3" id="inputDescription" v-model="user.description"></textarea>

        </div>
        <button type="button" class="btn btn-primary" @click="saveEditProfile(this.user)">Speichern</button>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
    </v-container>
  <!-- <section>
    <div style="float: right">
      <button class="btn btn-warning" @click="editProfileModal=true"><i class="fa-solid fa-pen fa-2x" ></i></button>
    </div>
    <div class="row d-flex align-items-center justify-content-center mb-5" style="text-align: center">
      <div class="col-md-6 col-12">
        <h2>{{user.name}} {{user.nachname}}</h2>
        <img :src="user.profilePicture" class="profile-picture img-fluid">
      </div>
      <div class="col-md-6 col-12">
        <h3>Bewertung: {{user.rating}}/5</h3>
      </div>
    </div>
    <div class="row mb-5">
      <h3>Steckbrief:</h3>
      <p>Handynummer: {{user.mobilenr}}</p>
      <p v-if="user.gender">Geschlecht: {{user.gender}}</p>
      <p v-if="user.birthdate">Geboren: {{user.birthdate}}</p>
      <p v-if="user.address">Addresse: {{user.address}}</p>

    </div>
    <div class="row mb-5">
      <div class="col-md-6 col-12">
        <h3 style="text-align: center">Über mich</h3>
        <div class="user-description-box d-flex align-items-center justify-content-center">
          {{user.description}}
        </div>
      </div>
      <div class="col-md-6 col-12">
        <h3 style="text-align: center">Meine Fahrzeuge</h3>
        <div class="car-description-box">
          <div class="row d-flex align-items-center justify-content-center">
            <div v-for="car in cars" :key="car"  class="col-md-3 col-12 mb-3">
              <div>
                <img :src="car.carImage" class="car-image"><br>
                <b>{{car.brand}} {{car.model}}</b>
                Sitze: {{car.seats}}<br>
                Stauraum: {{car.storage}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 style="text-align: center">Bewertungen</h3>
        <div v-for="comment in comments" :key="comment">
          <div class="row d-flex align-items-center justify-content-center">
            <div class="col-md-3 col-12">
              <div v-if="comment.customerImage !==''">
                <img :src="comment.customerImage" class="img-fluid comment-image">
              </div>
              <div v-if="comment.customerImage===''">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" class="img-fluid comment-image">
              </div>
            </div>
            <div class="col-md-9 col-12 commentbox">
              <p>{{comment.customerName}}</p>
              <p style="color: rgba(0,0,0,0.5)">{{comment.start}} <i class="fa-solid fa-arrow-right"></i> {{comment.destination}}</p>
              <p class="mb-2">{{comment.comment}}</p>
              <p>{{comment.rating}}/5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> -->
  <!--Modal to Edit Profile-->
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <!-- <modal :show="editProfileModal" @close="editProfileModal = false">
      <template #header>
        <p>Profil bearbeiten</p>
        <button class="btn btn-secondary" style="text-align: right" @click="editProfileModal = false;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </template>
      <template #body>
        <div class="form-group">
          <label for="inputFirstname">Vorname</label>
          <input type="text" class="form-control" id="inputFirstname" placeholder="Vorname..." v-model="user.name">

          <label for="inputLastname">Nachname</label>
          <input type="text" class="form-control" id="inputLastname" placeholder="Nachname..." v-model="user.nachname">

          <label for="inputMail">Mail</label>
          <input type="text" class="form-control" id="inputMail" placeholder="Mail..." v-model="user.email">

          <label for="inputMobileNr">Handy Nummer</label>
          <input type="text" class="form-control" id="inputMobileNr" placeholder="Handy..." v-model="user.mobilenr">

          <label for="inputBirthdate">Geburtsdatum</label>
          <input type="date" class="form-control" id="inputBirthdate" placeholder="Datum" v-model="user.birthdate">

          <label for="inputGender">Geschlecht</label>
          <input type="text" class="form-control" id="inputGender" placeholder="Geschlecht..." v-model="user.gender">

          <label for="inputAddress">Address</label>
          <input type="text" class="form-control" id="inputAddress" placeholder="Addresse..." v-model="user.address">

          <label for="inputPicture">Bild</label>
          <input type="text" class="form-control" id="inputPicture" placeholder="Bild URL..." v-model="user.profilePicture">

          <label for="inputDescription">Beschreibung</label>
          <textarea type="text" class="form-control" rows="3" id="inputDescription" v-model="user.description"></textarea>

        </div>
      </template>
      <template #footer>
        <button type="button" class="btn btn-primary" @click="saveEditProfile(this.user)">Speichern</button>
      </template>
    </modal> -->
  </Teleport>
</template>


<script>
export default {
  name: "Profile",
  created() {
    document.title = "Profil";
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
    }
  },
  methods:{
    saveEditProfile(user){
      this.axios.request({
        method: 'PUT',
        url: this.url+'profile',
        data: {
          user
        }
      })
          .then(function(response){
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
    getCars(){
      this.axios.get(this.url+'profile/vehicles',{
      })
          .then((response) => {
            this.cars = response.data.vehicleList
          })
    },
    getComments(){
      this.axios.get(this.url+'profile/ratings',{
      })
          .then((response) => {
            this.comments = response.data.ratingList
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
