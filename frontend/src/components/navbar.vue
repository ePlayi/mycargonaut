<template>
  <div class="navbar">
    <router-link to="/" class="nav-item"><i class="fa-solid fa-house"></i></router-link>
    <router-link to="/tracking" class="nav-item" style="position: relative"><i class="fa-solid fa-map-location-dot"></i></router-link>
    <router-link to="/profile" class="nav-item"><i class="fa-solid fa-user"></i></router-link>
    <router-link to="/menu" class="nav-item"><i class="fa-solid fa-bars"></i></router-link>
  </div>

</template>

<script setup>
</script>

<style scoped>
/* Place the navbar at the bottom of the page, and make it stick */
.navbar {
  padding: 0 10px;
  background-color: #333;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

/* Style the links inside the navigation bar */
.nav-item {
  color: #f2f2f2;
  width: 20vw;
  transition: all ease-in-out .1s;
  display: inline-block;
  text-align: center;
  padding: 14px 0;
}
/* Change the color of links on hover */
.nav-item:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.nav-item.active {
  background-color: #00564f;
  color: rgba(255, 255, 255, 0.68);
  margin: 0 10px;
  transform: scale(1.2);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}


</style>
