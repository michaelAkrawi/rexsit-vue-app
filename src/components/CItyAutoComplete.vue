<template>
    <div>
        <div>
          <input type="text" v-model="inputText" v-on:change="getCity">
        </div>
    <div>
      <p  v-for="c in cities">{{c.Name}}</p>
    </div>
    </div>
    
    
    
</template>

<script>
import { apihelper } from "../scripts/apihelper.js";
import Vue from "vue";

export default {
  name: "city-autocomplete",
  data: function() {
    return {
      inputText: "",
      cities: []
    };
  },
  watch: {
    inputText: function(newSearch, oldSearch) {
      this.debouncedGetCity();
    }
  },
  created: function() {
    this.debouncedGetCity = _.debounce(this.getCity, 500); //use lodash to delay fetch call
  },
  methods: {
    getCity: function() {
      self = this;
      if (this.inputText != "") {
        apihelper.fetchCities(this.inputText, function(error, data) {
          if (error) {
            console.log(error);
          } else {
            self.cities = data;
          }
        });
      }else{
        this.cities = [];
      }
    }
  }
};
</script>

