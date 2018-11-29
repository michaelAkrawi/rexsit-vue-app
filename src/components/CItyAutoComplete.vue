
<template>
    <div>
        <div class="city-search-container">
          <span>
            <i class="fas fa-map-marker-alt"></i>
          </span>
          <input type="text" v-model="inputText" v-on:change="getCity" placeholder="שם העיר">
        </div>  

        <ul id="city-search-results" v-show="showSearchResults">
          <li v-for="c in cities">
            <a @click="setSelectedCityText(c.name)">{{c.name}}</a>
          </li>
        </ul>                                
    </div>                    
</template>

<script>
import { apihelper } from "../scripts/apihelper.js";

export default {
  name: "city-autocomplete",
  data: function() {
    return {
      inputText: "",
      cities: [],
      showSearchResults: false,
      lastQuery: ""
    };
  },
  watch: {
    inputText: function(newQuery, oldQuery) {
      if (newQuery !== this.lastQuery) {
        this.lastQuery = newQuery;
        this.debouncedGetCity();
      }
    }
  },
  created: function() {
    this.debouncedGetCity = _.debounce(this.getCity, 500); //use lodash to delay fetch call
  },
  methods: {
    getCity: function() {     
      self = this;
      self.showSearchResults = true;
      if (this.inputText != "") {
        apihelper.fetchCities(this.inputText, function(error, data) {
          if (error) {
            console.log(error);
          } else {
            self.cities = data;
          }
        });
      } else {
        this.cities = [];
      }
    },

    setSelectedCityText(text) {
      this.lastQuery = text;
      this.inputText = text;
      this.showSearchResults = false;
    }
  }
};
</script>

<style>
.city-search-container span {
  position: absolute;
  top: 15px;
  right: 24px;
  display: inline-block;
}

#city-search-results {
  position: absolute;
  margin-top: 15px;
  list-style-type: none;
  padding: 0;
  background-color: #fff;
  width: 100%;
  right: 0;
}

#city-search-results li {
  cursor: pointer;
}

#city-search-results li a {
  display: block;
  padding: 10px;
}

#city-search-results li:hover {
  background-color: #ddd;
}
</style>


