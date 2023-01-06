<template>
  <div class="login-component" v-if="loggedIn===false">
    <div class="password-container" v-if="register_component===false">
      <h1 class="text-center">Login</h1>
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
      </form>
    </div>
    <div class="password-container" v-if="register_component===true">
      <form class="text-center">
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

      </form>
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
import Navbar from "@/components/navbar";

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

      register_loginname:"",
      register_password:"",
      register_confirmpassword:"",
      register_name:"",
      register_lastname:"",
      register_mail: "",
      register_mobilenr: "",
      //IF LOCAL TESTED USE THIS URL FOR THE API CALLS
      url: 'http://localhost:3001/'

      //url: 'https://mycargonaut.onrender.com/'

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
body{
  background-color: #d3d3d3;
}
#app {
  font-family: "Arial",serif;
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
  margin-top: 40%;
}
</style>
