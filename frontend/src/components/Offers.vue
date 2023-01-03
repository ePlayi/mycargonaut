<template>
    <v-container>
      <div>
        {{offers}}
      </div>
    </v-container>
</template>


<script>
export default {
  name: "Offers",
  created () {
    document.title = "Alle Angebote";
  },
  data(){
    return{

    }
  },
  beforeMount() {
    this.getOffers()
  },
  methods:{
    async getOffers() {
      console.log("Function called")
      const response = await fetch('https://t33jmpij.directus.app/collections/Ride');
      const data = await response.json();
      console.log(data);

    }
  }
}
</script>

<style scoped>
.profilePicture{
  max-height: 10rem;
}
.offer-card{
  background-color: white;
  border-radius: 1rem;
  word-break: break-all;
}
</style>
