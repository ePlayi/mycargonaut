<template>
  <header>
    <img src="../../assets/images/mainIMages/Header-Image.webp" class="header-image">
  </header>
  <section>
    <h1 class="text-center">Das Ergebnis wenn DHL und eBay-Kleinanzeigen ein Kind bekommen:</h1>
    <div class="text-center mb-5">
      <img src="../../assets/images/logo/semi_androidMyCargonautmdpi.png" class="img-fluid" width="200">
    </div>
    <!--Cards-->
    <div class="text-center" style="margin: 0 auto">
      <div class="row">
        <div class="col-md-3 col mb-3">
          <div class="card" >
            <img class="card-img-top" src="../../assets/images/undraw/search-image.svg" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Alle Angebote</h5>
              <router-link to="/offers" class="btn btn-primary">Durchstöbern</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-3 col mb-3">
          <div class="card" >
            <img class="card-img-top" src="../../assets/images/undraw/order-image.svg" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Ich biete / suche</h5>
              <router-link to="/createOffer" class="btn btn-primary">Angebot machen</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-3 col mb-3">
          <div class="card" >
            <img class="card-img-top" src="../../assets/images/undraw/tracking-image.svg" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Wo ist?</h5>
              <router-link to="/tracking" class="btn btn-primary">Tracking</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-3 col mb-3">
          <div class="card" >
            <img class="card-img-top" src="../../assets/images/undraw/car-image.svg" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Meine Fahrzeuge</h5>
              <router-link to="/myVehicels" class="btn btn-primary">Ansehen</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: "homeView",
  created () {
    document.title = "myCargonaut";
  }
}
</script>

<style scoped>
header{
  width: 100%;
  max-height: 20rem;
}
.header-image{
  width: 100%;
  max-height: 20rem;
  object-fit: cover;
}
.card{
  width: auto;
}
.card-img-top{
  height: 10rem;
}
</style>
