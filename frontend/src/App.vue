<template>
  <div class="login-component" v-if="loggedIn===false">
    <div class="password-container" v-if="register_component===false">
      <!-- <h1 class="text-center">Login</h1>
      <form class="text-center">
        <div class="form-group mt-3">
          <label for="inputLoginname">Loginname</label>
          <input type="text" class="form-control" id="inputLoginname" placeholder="Loginname..." v-model="loginname">
        </div>
        <div class="form-group mt-3">
          <label for="inputPassword">Passwort</label>
          <input type="password" class="form-control" id="inputPassword" placeholder="Passwort..." v-model="password">
        </div>
        <button type="submit" class="btn btn-success mt-3" @click="postLogin()">Login</button><br>
        <button type="submit" class="btn btn-outline-success mt-3" @click="register_component = true">Noch kein Account?</button>
      </form> -->
      <v-container class="mt-16">
        <v-card class="login-card" rounded="4" align="center">
            <v-card-title>Login</v-card-title>
            <v-form class="login-form" v-model="valid">
                <v-container>
                    <v-row>
                        <v-col
                        cols="12"
                        >
                        <v-text-field
                            v-model="loginname"
                            label="Username"
                            type="Username"
                            required
                        ></v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        >
                        <v-text-field
                            v-model="password"
                            label="Passwort"
                            type="password"
                            required
                        ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
            <v-card-text class="no-account-text mb-16">
                <span style="text-decoration: none; color: blue; cursor: pointer" @click="register_component = true">Noch kein Account?</span>
            </v-card-text>
            <v-btn
            class="mb-8"
            elevation="0"
            variant="outlined"
            rounded="2"
            @click="postLogin()">
                Jetzt Einloggen
            </v-btn>
        </v-card>
      </v-container>
    </div>
    <div class="password-container" v-if="register_component===true">
      <!-- <form class="text-center">
        <div class="form-group mt-3">
          <label for="inputRegisterLoginname">Loginname (Damit loggen Sie sich ein)</label>
          <input type="text" class="form-control" id="inputRegisterLoginname" placeholder="Loginname..." v-model="register_loginname">
        </div>
        <div class="form-group mt-3">
          <label for="inputRegisterName">Vorname</label>
          <input type="text" class="form-control" id="inputRegisterName" placeholder="Vorname..." v-model="register_name">
        </div>
        <div class="form-group mt-3">
          <label for="inputRegisterLastName">Nachname</label>
          <input type="text" class="form-control" id="inputRegisterLastName" placeholder="Nachname..." v-model="register_lastname">
        </div>
        <div class="form-group mt-3">
          <label for="inputRegisterMail">Mail</label>
          <input type="email" class="form-control" id="inputRegisterMail" placeholder="Mail..." v-model="register_mail">
        </div>
        <div class="form-group mt-3">
          <label for="inputRegisterMobileNr">Telefonnummer</label>
          <input type="text" class="form-control" id="inputRegisterMobileNr" placeholder="Mail..." v-model="register_mobilenr">
        </div>
        <div class="form-group mt-3">
          <label for="inputRegisterPassword">Passwort</label>
          <input type="password" class="form-control" id="inputRegisterPassword" placeholder="Passwort..." v-model="register_password">
        </div>
        <div class="form-group mt-3">
          <label for="inputRegisterPasswordConfirm">Passwort Erneut eingeben</label>
          <input type="password" class="form-control" id="inputRegisterPasswordConfirm" placeholder="Passwort..." v-model="register_confirmpassword">
        </div>
        <button type="submit" class="btn btn-success mt-3" @click="register()">Registrieren</button>

      </form> -->
      <v-container class="mt-16">
            <v-card class="login-card" rounded="4" align="center">
                <v-card-title>Registrierung</v-card-title>
                <v-form class="login-form" v-model="valid">
                    <v-container>
                        <v-row>
                            <!-- <v-col
                            cols="12"
                            >
                                <v-file-input
                                    v-model="register_profilepicture"
                                    accept=".jpg, .jpeg, .png"
                                    label="Ein Bild von dir!"
                                    prepend-icon="fas fa-camera"
                                ></v-file-input>
                            </v-col> -->

                            <v-col
                            cols="12"
                            >
                            <v-text-field
                                v-model="register_profilepicture"
                                label="Profilbild-URL"
                                type="url"
                                :rules="requiredRule"
                                required
                            ></v-text-field>
                            </v-col>

                            <v-col
                            cols="12"
                            >
                            <v-text-field
                                v-model="register_loginname"
                                label="Nutzername"
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
                                v-model="register_name"
                                label="Vorname"
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
                                v-model="register_lastname"
                                label="Nachname"
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
                                v-model="register_mail"
                                label="E-Mail"
                                type="email"
                                :rules="requiredRule"
                                required
                            ></v-text-field>
                            </v-col>

                            <v-col
                            cols="12"
                            sm="6"
                            >
                            <v-text-field
                                v-model="register_mobilenr"
                                label="Handynummer"
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
                                v-model="register_password"
                                label="Passwort"
                                type="password"
                                :rules="requiredRule"
                                required
                            ></v-text-field>
                            </v-col>

                            <v-col
                            cols="12"
                            sm="6"
                            >
                            <v-text-field
                                v-model="register_confirmpassword"
                                label="Passwort wiederholen"
                                type="password"
                                :rules="requiredRule"
                                required
                            ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
                <v-card-text class="no-account-text mb-16">
                    <span style="text-decoration: none; color: blue; cursor: pointer" @click="register_component = false">Du hast einen Account?</span>
                </v-card-text>
                <v-btn
                class="mb-8"
                elevation="0"
                variant="outlined"
                rounded="2"
                @click="register()">
                    Jetzt Registrieren
                </v-btn>
            </v-card>
      </v-container>
    </div>
  </div>
  <!--Here is the content of each component-->
  <div v-if="loggedIn===true">
    <router-view></router-view>
  </div>
  <!--Navbar component under router-view. Navbar is sticky bottom-->
  <navbar></navbar>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data(){
    return{
      loggedIn: false,
      loginname:"",
      password:"",
      register_component: false,

      register_profilepicture:"",
      register_loginname:"",
      register_password:"",
      register_confirmpassword:"",
      register_name:"",
      register_lastname:"",
      register_mail: "",
      register_mobilenr: "",
      //IF LOCAL TESTED USE THIS URL FOR THE API CALLS
      //url: 'http://localhost:3001/'
      url: 'https://mycargonaut.onrender.com/',

      requiredRule: [v => !!v || 'This field is required'],

    }
  },
  beforeMount() {
    if (navigator.onLine){
      this.checkLogin()
    }else {
      this.loggedIn=true;
    }
  },
  mounted() {
    window.addEventListener('online', this.checkLogin);
  },
  methods:{

    register(){
      event.preventDefault()
      if (this.register_password !== "" && this.register_loginname !== "" && this.register_name !== "" && this.register_lastname !== "" && this.register_mail !== "" && this.register_mobilenr !== ""){
        if (this.register_password === this.register_confirmpassword){
          this.axios.request({
            method: 'POST',
            url: this.url+'register',
            data: {
              username: this.register_loginname.toString().trim(),
              password: this.register_password.toString().trim(),
              name: this.register_name.toString().trim(),
              lastname: this.register_lastname.toString().trim(),
              mail: this.register_mail.toString().trim(),
              phone: this.register_mobilenr.toString().trim(),

            },
          })
              .then(response => {
                console.log(response.data)
                if (response.status===409){
                  alert("Loginname bereits verwendet. Nutzen Sie einen anderen")
                  this.register_loginname=""
                  this.register_password=""
                  this.register_confirmpassword=""
                }
                if(response.status===201){
                  this.loginname=this.register_loginname
                  this.password=this.register_password
                  this.postLogin()
                  console.log("Worked")
                  this.register_component = false
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        else{
          alert("Passwort stimmt nicht überein.")
          this.register_password=""
          this.register_confirmpassword=""
        }
      }

    },
    checkLogin(){
      this.axios.get(this.url+'login').then((response) => {
        if(response.status===200){
          this.loggedIn=true
        }
      })
          .catch(function (error) {
            console.log(error);
          });
    },
    postLogin(){
      event.preventDefault()
      this.axios.request({
        method: 'POST',
        url: this.url+'login',
        data: {
          username: this.loginname.toString().trim(),
          password: this.password.toString().trim()
        },
      })
          .then(response => {
            console.log(response.data)
            if (response.status===401){
              alert("Falsche Logindaten")
            }else{
              this.loggedIn=true
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

body{
  background-color: #d3d3d3;
}
#app {
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 60px;
}
section{
  margin: 1rem;
  max-width: 100vw;
  overflow-x: hidden;
}
h1{
  color: #565656;
}
section{
  padding: 1rem;
}

.password-container{
  width: 60vw;
  margin: 0 auto;
  height: 100%;
}

.login-card {
    max-width: 500px;
    margin: 0 auto;
}

.no-account-text {
    margin-top: -30px;
}
</style>
