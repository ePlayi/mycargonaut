<template>
<h1 class="text-center mb-5 mt-5">Transportangebote</h1>
<section>
  <div class="offer-card">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-md-3">
        <img src="../../assets/images/profilePictures/AdobeStock_482780731.jpeg" class="profilePicture img-fluid">
      </div>
      <div class="col-md-7">
        <div class="row">
          <div class="col-md-6">
            <h3>Rainer, 53 aus Düsseldorf</h3>
          </div>
          <div class="col-md-6">
            <h3>
              Bietet an:<br>
              <b>Mitfahrgelegenheit</b>
            </h3>
          </div>
        </div>
      </div>
      <div class="col-md-1 text-end">
        <h3>
          Rating:<br>
          3,1/5
        </h3>

      </div>
    </div>
  </div>
</section>

</template>

<script>
export default {
  name: "offerListView",
  created () {
    document.title = "Alle Angebote";
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
