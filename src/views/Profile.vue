<template>
     <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-lg-6 col-md-auto">
            <wizard :steps="steps">
                <wizard-step slot="details">
                    <form>
                      <div class="row">
                        <div class="col-6">
                          <div class="form-group">
                            <label for="txb-first-name"> {{$t("firstname")}} </label>
                            <input type="text" id="txb-first-name" class="form-control" v-model="profile.firstName" />
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="form-group">
                            <label for="txb-last-name">{{$t("lastname")}} </label>
                            <input type="text" id="txb-last-name" class="form-control" v-model="profile.lastName"/>
                          </div>
                          </div>
                        </div>                            
                        <div class="form-group">
                          <label for="drop-down-cities">{{$t("city")}}</label>
                          <select id="drop-down-cities" class="form-control" v-model="profile.cityID">
                            <option disabled value="0"> {{$t("city")}} </option>
                            <option v-for="c in cities" :value="c.ID"> {{c.Name.trim()}} </option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="txb-address">{{$t("address")}} </label>
                          <input type="text" id="txv-address" class="form-control" v-model="profile.address" />
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
                        <date-drop-down></date-drop-down>             
                      </form>
                  </wizard-step>
                  <wizard-step slot="dogs">
                    <input type="text" placeholder="כלב"/>
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
import DateDropDown from "../components/DateDropDown.vue";
import { apihelper } from "../scripts/apihelper.js";
import { userService } from "../services/users-service";
import { getAuthUser } from "../scripts/auth";

export default {
  name: "app",
  components: {
    wizard: Wizard,
    "wizard-step": WizardStep,
    "city-autocomplete": CityAutoComplete,
    "date-drop-down": DateDropDown
  },
  data: function() {
    return {
      cities: [],
      steps: [
        { name: "details", icon: "fas fa-user", title: "פרטים", active: true },
        { name: "dogs", icon: "fas fa-paw", title: "כלבים", active: false }
      ],
      profile: {
        firstName: "",
        lastName: "",
        cityID: 0,
        address: "",
        birthDate: undefined
      }
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
    },
    fetchUserData() {
      const loggedUser = getAuthUser();
      userService
        .getById(loggedUser.ID)
        .then(response => {
          if (response.data) {
            this.profile.firstName = response.data.FirstName;
            this.profile.lastName = response.data.LastName;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.fetchCities();
    this.fetchUserData();
  }
};
</script>
