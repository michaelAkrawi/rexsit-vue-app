<template>
     <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-lg-6 col-md-auto">
            <wizard :steps="steps">
                <wizard-step slot="details" title="פרטים" icon="fas fa-user">
                    <form>
                      <div class="row">
                        <div class="col-6">
                          <div class="form-group">
                            <label for="txb-first-name"> {{$t("firstname")}} </label>
                            <input type="text" id="txb-first-name" class="form-control" />
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="form-group">
                            <label for="txb-last-name">{{$t("lastname")}} </label>
                            <input type="text" id="txb-last-name" class="form-control"/>
                          </div>
                          </div>
                        </div>                            
                        <div class="form-group">
                          <label for="drop-down-cities">{{$t("city")}}</label>
                          <select id="drop-down-cities" class="form-control" v-model="cities">
                            <option v-for="c in cities" :value="c.ID"> {{c.Name.trim()}} </option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="txb-address">{{$t("address")}} </label>
                          <input type="text" id="txv-address" class="form-control" />
                        </div>                             
                        <div class="form-group">
                          <label for="txb-phone">{{$t("telephone")}}</label>
                          <input type="tel" id="txb-phone"  class="form-control"/>
                        </div>
                        <div class="row">
                          <div class="col-12">
                            <label for="">{{$t("birthdate")}}</label>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-4">                                                        
                            <select id="drop-down-day" class="form-control"></select>                            
                          </div>
                          <div class="col-4">                                                        
                            <select id="drop-down-month" class="form-control"></select>                            
                          </div>
                          <div class="col-4">                                                        
                            <select id="drop-down-year" class="form-control"></select>                            
                          </div>
                        </div>                        
                      </form>
                  </wizard-step>
              </wizard>
          </div>
        </div>
      </div>
</template>

<style scoped>
label {
  font-weight: 600;
}
</style>



<script>
import Wizard from "../components/Wizard.vue";
import WizardStep from "../components/WizardStep.vue";
import CityAutoComplete from "../components/CityAutoComplete.vue";
import { apihelper } from "../scripts/apihelper.js";

export default {
  name: "app",
  components: {
    wizard: Wizard,
    "wizard-step": WizardStep,
    "city-autocomplete": CityAutoComplete
  },
  data: function() {
    return {
      cities: [],
      steps : ['details']
    };
  },
  methods: {
    fetchCities() {
      var vm = this;
      apihelper.fetchCities("", function(error, response) {
        if (error) console.log(error);
        else {
          response.forEach(element => {
            vm.cities.push(element);
          });
        }
      });
    }
  },
  created() {
    this.fetchCities();
  }
};
</script>
