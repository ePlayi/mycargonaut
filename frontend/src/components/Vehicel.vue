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
  <!--
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

    </div>
    </div>
  </section>
-->

    <h2 class="überschrift">Meine Fahrzeuge:</h2>

<section>
  <div>
    <button class="btn btn-success" @click="addCarModal=true">Fahrzeug Hinzufügen</button>
  </div>
</section>

<section>
  <div>
    <div v-for="car in cars" :key="car" class="card" id="carr">
      <div class="card-body">
        <p class="cardcontent">Marke: {{car.brand}}</p>
        <p class="cardcontent">Model: {{car.model}}</p>
        <p class="cardcontent">Sitze: {{car.seats}}</p>
        <p class="cardcontent">Stauraum: {{car.storage}}</p>
        <img :src="car.carImage" width="200" height="100"><br>
        <button class="btn btn-warning" @click="openEditModal(car)">Bearbeiten</button>
      </div>
    </div>
  </div>

</section>

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
  name: "Vehicel",
  components:{
    Modal
  },
  created() {
    document.title = "Vehicel";
  },
  mounted() {

  },
  beforeMount() {
    this.getCars()
  },
  data() {
      return {
        url: 'http://localhost:3001/',
        //url: 'https://mycargonaut.onrender.com/',
        cars:[],
        carNames: [],


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
    }
  }

}

</script>


<style scoped>
  .überschrift{
    font-weight: bold;
    margin-top: 5%;
    margin-left: 2%;
  }
  #carr{
    max-width: 230px;
  }
  .cardcontent{
    font-weight: normal;
    color: gray;
  }
</style>
