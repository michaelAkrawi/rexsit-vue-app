<template>
  <div>
    <div class="form-group form-check">
         <checkbox-vue v-model="services.dogWalker.active" id="chk-dog-walker" :checked="isDogWalker">{{$t("dogWalker")}}</checkbox-vue>
    </div>
    <p class="text-muted">
        {{$t("dogWalkerServiceDescription")}}
    </p>
    <div class="form-group" v-show="isDogWalker">
        <label  for="drop-rate-per-walk"> {{$t("ratePerWalk")}} </label>
        <select id="drop-rate-per-walk" v-model="services.dogWalker.rate" class="form-control">
            <option value="20"> &#8362;20 </option>
            <option value="25"> &#8362;25 </option>
            <option value="30"> &#8362;30 </option>
            <option value="35"> &#8362;35 </option>
            <option value="40"> &#8362;40 </option>
            <option value="50"> &#8362;50 </option>
            <option value="60"> &#8362;60 </option>
            <option value="70"> &#8362;70 </option>
            <option value="80"> &#8362;80 </option>
            <option value="90"> &#8362;90 </option>
            <option value="100"> &#8362;100 </option>
        </select>
    </div>
    <div class="form-group from-check">
        <checkbox-vue id="chk-dog-sitter" v-model="services.dogSitter.active" :checked="isDogSitter"> {{$t("dogSitter")}}  </checkbox-vue>
    </div>
    <p class="text-muted"> {{$t("dogSitterDescription")}} </p>
    <div class="form-group" v-show="isDogSitter">
        <label for="drop-rate-per-day">{{$t("ratePerDay")}}</label>
        <select id="drop-rate-per-day" v-model="services.dogSitter.rate" class="form-control">
            <option value="50"> &#8362;50 </option>
            <option value="60"> &#8362;60 </option>
            <option value="70"> &#8362;70 </option>
            <option value="80"> &#8362;80 </option>
            <option value="90"> &#8362;90 </option>
            <option value="110"> &#8362;110 </option>
            <option value="115"> &#8362;115 </option>
            <option value="120"> &#8362;120 </option>
            <option value="125"> &#8362;125 </option>
            <option value="130"> &#8362;130 </option>
        </select>
    </div>
    <div class="form-group" v-show="isDogSitter">
        <label for=""> {{$t("ratePerAdditionalDog")}} </label>
        <select id="drop-for-additional-dog" v-model="services.dogSitter.additionalDogRate" class="form-control">
            <option value="15"> &#8362;15 </option>
            <option value="20"> &#8362;20 </option>
            <option value="25"> &#8362;25 </option>
            <option value="30"> &#8362;30 </option>
            <option value="40"> &#8362;40 </option>
            <option value="50"> &#8362;50 </option>
            <option value="60"> &#8362;60 </option>
            <option value="70"> &#8362;70 </option>
            <option value="80"> &#8362;80 </option>
            <option value="90"> &#8362;90 </option>
        </select>
    </div>
  </div>  
</template>

<script>
import Checkbox from "../components/Checkbox.vue";
import { dogWalkersService } from "../services/dog-walker-service.js";
import { dogSitterService } from "../services/dog-sitter-service.js";

export default {
  name: "profile-services",
  data() {
    return {
      services: {
        dogWalker: {
          active: false,
          rate: 20
        },
        dogSitter: {
          active: false,
          rate: 50,
          additionalDogRate: 15
        }
      }
    };
  },
  components: {
    "checkbox-vue": Checkbox
  },
  computed: {
    isDogWalker() {
      return this.services.dogWalker.active;
    },
    isDogSitter() {
      return this.services.dogSitter.active;
    }
  },
  methods: {
    fetchDogWalkerData() {
      var vm = this;
      dogWalkersService
        .get()
        .then(response => {
          vm.services.dogWalker.active = true;
          vm.services.dogWalker.rate = response.rate;
        })
        .catch(error => {});
    },
    fetchDogSitterData() {
      var vm = this;
      dogSitterService
        .get()
        .then(response => {
          vm.services.dogSitter.active = true;
          vm.services.dogSitter.rate = response.rate;
          vm.services.dogSitter.additionalDogRate = response.additionalDogRate;
        })
        .catch(error => {
          if (error.response.statusCode == "404") {
            vm.services.dogSitter.active = false;
          }
        });
    },
    updateServices() {
      if (this.services.dogWalker.active) {
        dogWalkersService.update(this.services.dogWalker);
      } else {
        dogWalkersService.remove();
      }
      if (this.services.dogSitter.active) {
        dogSitterService.update(this.services.dogSitter);
      } else {
       debugger;
       dogSitterService.remove();
      }
    }
  },
  mounted() {
    this.fetchDogWalkerData();
    this.fetchDogSitterData();
  }
};
</script>

