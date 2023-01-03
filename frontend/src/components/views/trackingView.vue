<template>
  <div class="map-box">
    <l-map ref="map" v-model:zoom="zoom" :center=position :maxZoom=18>
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"

      >
      </l-tile-layer>
      <l-marker :lat-lng=position>

      </l-marker>
    </l-map>
  </div>
</template>

<script>


import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker  } from "@vue-leaflet/vue-leaflet";

export default {
  name: "trackingView",
  created () {
    document.title = "Tracking";
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,

  },

  data() {
    return {
      //entry zoomlevel
      zoom: 8,
      //edit this to get other positions on the map. Its centered to this position and the marker uses the same value
      position: [50.52687192341124, 8.654176867109685]
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style>
.map-box{
  height: 50vh;
  width: 100vw;
}

</style>
}


