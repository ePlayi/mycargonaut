<template>
<!--
  <section>
    <h1>Meine Fahrzeuge</h1>
    <div class="row mb-5">
      <h2>Fahrzeug Name: {{ Fahrzeug.name }}</h2>
      <p v-if="Fahrzeug.modell">Modell: {{ Fahrzeug.modell }}</p>
      <p v-if="Fahrzeug.company">Company: {{ Fahrzeug.company }}</p>
      <p v-if="Fahrzeug.seats">Seats: {{ Fahrzeug.seats }}</p>
      <p v-if="Fahrzeug.storage">Storage: {{ Fahrzeug.storage }}</p>
      <p v-if="Fahrzeug.image">image: {{ Fahrzeug.image }}</p>
    </div>
  </section>


  <div *ngFor="let car of carNames">
  <div class="col-md-3 col mb-3">
    <div class="card" >
      <div class="card-body">
        <h4 class="card-title">Model: {{ car.name }}</h4>
        <div>
          <img class="card-img-top" src="../assets/images/undraw/car-image.svg" alt="Card image cap">
        </div>
        <h6>Status:</h6>
      </div>
    </div>
  </div>
</div>
-->
  <header>

  </header>
  <section>
    <h2 class="überschrift">Meine Fahrzeuge:</h2>
  </section>
  <section>
    <div  id="MeineFahrzeuge" class="text-center" style="margin: 0 auto">
      <div class="row">
        <div class="col-md-3 col mb-3">
              <div class="card" >
                <div class="card-body">
                  <h5  class="card-title" id="Namee">Model: {{cars.name }}</h5>
                  <div>
                    <v-img :src="cars.img" cover></v-img>
                  </div>
                  <h6 id="Statuss">Status:</h6>
                </div>
              </div>
          </div>
        <div class="col-md-3 col mb-3">
          <div class="card" >
            <div class="card-body">

              <h5  class="card-title">Model: {{ cars.name }}</h5>
              <div>
                <img class="card-img-top" src="../assets/images/undraw/car-image.svg" alt="Card image cap">
              </div>
              <h6>Status:</h6>
            </div>
          </div>
        </div>
        <div class="col-md-3 col mb-3">
          <div class="card" >
            <div class="card-body">

              <h4  class="card-title">Model: {{ cars.name }}</h4>
              <div>
                <img class="card-img-top" src="../assets/images/undraw/car-image.svg" alt="Card image cap">
              </div>
              <h6>Status:</h6>
            </div>
          </div>
        </div>
        <div class="col-md-3 col mb-3">
          <div class="card" >
            <div class="card-body">

              <h5  class="card-title">Model: {{ cars.name }}</h5>
              <div>
                <img class="card-img-top" src="../assets/images/undraw/car-image.svg" alt="Card image cap">
              </div>
              <h6>Status:</h6>
            </div>
          </div>
        </div>
    </div>
    </div>
  </section>

</template>




<script>



export default {
  name: "Vehicel",
  created() {
    document.title = "Vehicel";
  },
  mounted() {

  },
 // beforeMount() {
//    this.getCars()
  //  this.getCarNames()
 // },
  data() {
      return {
        url: 'http://localhost:3001/',
       // url: 'https://mycargonaut.onrender.com/',
        cars:[],
        carNames: [],
      }
    },

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
            this.cars=response.data.vehicleList
          })
    },

    getCarNames(){
      this.cars.forEach(car => {
        this.carNames.push(car.brand + " " + car.model)
        console.log(car)
        console.log(this.carNames)
      });
    },
  getCarStatus(){
    this.axios.get(this.url+'', {

    })
  },
  getcarimg(){
    this.axios.get()
  }
  }

</script>


<style scoped>
  .überschrift{
    font-weight: bold;
    margin-top: 5%;
  }
  #Namee{
    color: gray;

  }
  #Statuss{
    color: gray;
  }
</style>
