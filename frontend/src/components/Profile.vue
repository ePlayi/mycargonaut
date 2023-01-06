<template>
  <!--
    <v-container id="main-container" align="center">
        <v-card class="profile-container" rounded="4" color="whitesmoke">
            <v-row justify="center" align="center">
                <v-col class="profile-pic-name" lg="6" sm="12" xs="12">
                        <v-avatar size="200px" class="ma-8">
                            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
                        </v-avatar>
                        <h1 style="margin-left: 10px">Mark Mustermann</h1>
                </v-col>
                <v-col lg="6" sm="12" xs="12">
                    <v-icon class="mx-2" icon="fas fa-star" color="orange" size="large"/>
                    <v-icon class="mx-2" icon="fas fa-star" color="orange" size="large"/>
                    <v-icon class="mx-2" icon="fas fa-star" color="orange" size="large"/>
                    <v-icon class="mx-2" icon="fas fa-star" color="orange" size="large"/>
                    <v-icon class="mx-2" icon="fas fa-star" color="orange" size="large"/>
                </v-col>
            </v-row>
            <v-row class="bottom-row">
                <v-col lg="6" sm="12" xs="12">
                    <v-card class="ma-4" color="grey" rounded="4" width="90%" elevation="0" justify="center" align="center">
                        <h2 class="my-4">Bewertungen</h2>

                        <v-row class="mx-4 mb-4" align="center" justify="center">
                            <v-col lg="2">
                                <v-avatar size="60px">
                                    <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
                                </v-avatar>
                            </v-col>
                            <v-col cols="10">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut
                                    aliquam aliquam, nunc nisl aliquet nisl, eget aliquet nisl nunc in elit. Sed
                                    euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquet nisl nunc
                                    in elit.
                                </p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col lg="6" sm="12" xs="12">
                    <v-card class="ma-4" color="grey" rounded="4" width="90%" elevation="0">
                        <h2 class="my-4">Meine Fahrzeuge</h2>
                        <v-row>
                            <v-col lg="4">
                                <v-img
                                class="car-image my-4"
                                aspect-ratio="1"
                                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                                cover
                                />
                            </v-col>
                            <v-col lg="4">
                                <v-img
                                class="car-image my-4"
                                aspect-ratio="1"
                                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                                cover
                                />
                            </v-col>
                            <v-col lg="4">
                                <v-img
                                class="car-image my-4 mb-10"
                                aspect-ratio="1"
                                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                                cover
                                />
                            </v-col>
                            <v-col lg="4">
                                <v-img
                                class="car-image my-4 mb-10"
                                aspect-ratio="1"
                                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                                cover
                                />
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
-->
  <section>
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
      <p v-if="user.adress">Adresse: {{user.adress}}</p>

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
  </section>
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
      //url: 'https://mycargonaut.onrender.com/',

      user:{},
      cars:[],
      comments:[],
    }
  },
  methods:{
    getProfileInformation(){
      this.axios.get(this.url+'profile',{
      })
          .then((response) => {
            this.user=response.data.user
          })
    },
    getCars(){
      this.axios.get(this.url+'cars',{
      })
          .then((response) => {
            this.cars=response.data.carList
          })
    },
    getComments(){
      this.axios.get(this.url+'comments',{
      })
          .then((response) => {
            this.comments=response.data.commentList
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
    max-width: 1300px;
    margin-top: 5vh;
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
