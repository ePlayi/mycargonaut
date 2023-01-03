<template>
  <!--Here is the content of each component-->
 <router-view></router-view>
  <!--Navbar component under router-view. Navbar is sticky bottom-->
  <navbar></navbar>
</template>

<script>
import Navbar from "@/components/navbar";

export default {
  name: 'App',
  components: {
    Navbar,
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
</style>
