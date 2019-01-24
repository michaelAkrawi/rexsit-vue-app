<template>
  <div class="google-map" id="g-map"></div>
</template>

<script>
import { geolocation, getGoogleStaticMap } from "../scripts/map.js";
export default {
  name: "google-map",
  props: {
    addresses: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },

  mounted() {},
  methods: {
    async loadMap() {
      const bounds = new google.maps.LatLngBounds();
      let markerCoordinates = await this.getMarkerCoordinates();
      debugger;
      const element = document.querySelector("#g-map");
      const mapCentre = markerCoordinates[0];
      const options = {
        center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
      };

      const map = new google.maps.Map(element, options);
      markerCoordinates.forEach(coord => {
        const position = new google.maps.LatLng(
          coord.latitude,
          coord.longitude
        );
        const marker = new google.maps.Marker({
          position,
          map
        });
        map.fitBounds(bounds.extend(position));
      });
    },

    getMarkerCoordinates() {
      return new Promise((resolve, reject) => {
        try {
          let promises = [];
          this.addresses.forEach(element => {
            promises.push(geolocation(element));
          });

          let arr = [];
          Promise.all(promises)
            .then(responses => {
              responses.forEach(element => {
                let coord = {
                  longitude: element[0].lon,
                  latitude: element[0].lat
                };
                arr.push(coord);
              });

              resolve(arr);
            })
            .catch(error => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      });
    },
    createMarkers(arr) {
      arr.forEach(element => {});
    }
  },
  watch: {
    addresses: function(newArray, oldArray) {
      this.loadMap();
    }
  }
};
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>


