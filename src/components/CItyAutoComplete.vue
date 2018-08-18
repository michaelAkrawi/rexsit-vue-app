<template>
    <input type="text" v-model="city" v-on:change="getCity">
</template>

<script>
import { apihelper } from "../scripts/apihelper.js";

export default {
  name: "city-autocomplete",
  data: function() {
    return {
      city: ""
    };
  },
  methods: {
    getCity: function() {
      apihelper.fetchCities(this.city, function(error, data) {
          if(error){

          }
          else{
              console.log(data);
          }
      });
    }
  }
};
</script>

