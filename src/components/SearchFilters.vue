<template>
    <form>
        <div id="search-filters-container">
            <div class="form-group mb-5">
                <label for="drop-down-services"> {{$t("services")}} </label>
                <select id="drop-service" class="form-control" v-model="filterService">
                    <option value="dogwalker"> {{$t("dogwalker")}} </option>
                    <option value="dogsitter"> {{$t("dogsitter")}} </option>
                </select>
            </div>
            <div class="form-group mb-5">
                <label for="txb-city"> {{$t("city")}} </label>
                <city-search value="city" v-model="filterCity"></city-search>
            </div>
            <div class="form-group mb-5">
                <label for="slider-rate"> {{$t("ratePerWalk")}}</label>   
                <vue-slider ref="slider-rate" v-model="rate" :value=rate v-bind="sliderOptions"></vue-slider>         
            </div>
        </div>
    </form>
</template>

<script>
import vSelect from "vue-select";
import CityAutoComplete from "../components/CityAutoComplete.vue";
import vueSlider from "vue-slider-component";

export default {
  name: "search-filters",
  components: {
    "vue-select": vSelect,
    "city-search": CityAutoComplete,
    "vue-slider": vueSlider
  },
  props: ["service", "city"],
  data() {
    return {
      rate: [35, 150],
      sliderOptions: {
        min: 35,
        max: 150,
        sliderStyle: {
          backgroundColor: "#fff"
        },
        processStyle: {
            backgroundColor : "#00d1b2"
        }     
      },
      filterService: "",
      filterCity: ""
    };
  },
  mounted() {
    this.filterService = this.service;
    this.filterCity = this.city;
  }
};
</script>

<style>
#search-filters-container {
  background-color: #fff;
  padding: 15px;
}

.city-search-container input[type="text"] {
  height: 100%;
  border-color: #ced4da;
}
</style>




