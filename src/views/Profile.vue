<template>
     <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-lg-7 col-md-auto">
            <wizard :steps="steps" :on-next-button-clicked="onWizardNextStep">
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
                            <option v-for="c in cities" :value="c.id"> {{c.name.trim()}} </option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="txb-address">{{$t("address")}} </label>
                          <input type="text" id="txv-address" class="form-control" v-model="profile.address" />
                        </div>                             
                        <div class="form-group">
                          <label for="txb-phone">{{$t("telephone")}}</label>
                          <input type="tel" id="txb-phone"  class="form-control" v-model="profile.cellPhone" :class="{'form-control-has-error': validation.hasError('profile.cellPhone')}"/>
                            <div class="error-message">{{ validation.firstError('profile.cellPhone') }}</div>
                        </div>
                        <div class="row">
                          <div class="col-6">
                            <label> {{$t("profileImage")}} </label>
                             <div>
                               <input type="button" value="Upload image">
                             </div>
                          </div>
                          <div class="col-6">
                              <img :src="profileImage">
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-12">
                            <label for="">{{$t("birthdate")}}</label>
                          </div>
                        </div>
                        <date-drop-down v-model="profile.birthDate"></date-drop-down>             
                      </form>
                  </wizard-step>
                  <wizard-step slot="dogs">                    
                    <div class="form-group">
                        <label for="txb-dog-name">{{$t("dogName")}}</label>
                        <input type="text" id="txb-dog-name" class="form-control">                        
                    </div>                 
                    <div class="row">
                      <div class="col-4">
                        <div class="form-group">
                          <label for="txb-age-years"> {{$t("ageByYears")}} </label>
                          <input id="txb-age-years" type="text" class="form-control">
                        </div>                        
                      </div>
                      <div class="col-4">
                        <div class="form-group">
                          <label for="txb-age-month">{{$t("ageByMonths")}} </label>
                          <input id="txb-age-months" type="text" class="form-control">
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="form-group">
                            <label for="rb-male">{{$t("male")}}</label>
                          <input type="radio" name="rb-gendar"  id="rb-male">
                        <label for="rb-female">{{$t("female")}}</label>
                        <input type="radio" name="rb-gendar" id="rb-female">
                        </div>
                        
                      </div>
                    </div>
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
import SimpleVueValidation from "simple-vue-validator";
const validator = SimpleVueValidation.Validator;

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
        {
          name: "details",
          icon: "fas fa-user",
          title: this.$t("details"),
          active: true
        },
        {
          name: "dogs",
          icon: "fas fa-paw",
          title: this.$t("dogs"),
          active: false
        }
      ],
      profile: {
        firstName: "",
        lastName: "",
        cityID: 0,
        address: "",
        birthDate: "",
        cellPhone: ""
      },
      profileImage: getAuthUser().profileImageURL
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
      var vm = this;
      userService
        .get()
        .then(response => {
          if (response.data) {
            vm.profile.firstName = response.data.firstName;
            vm.profile.lastName = response.data.lastName;
            vm.profile.cityID = response.data.cityID;
            vm.profile.address = response.data.address;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onWizardNextStep(step) {
      return new Promise((resolve, reject) => {
        this.$validate().then(succ => {
          if (succ) {
            this.callStepFunction(step);
            resolve();
          }
        });
      });
    },
    callStepFunction(step) {
      if (step.name == "details") {
        this.savePersonalInfo();
      }
    },
    savePersonalInfo() {
      userService.updatePersonalInfo(this.profile).catch(error => {
        console.log(error);
      });
    }
  },
  validators: {
    "profile.cellPhone": function(value) {
      return validator.value(value).integer();      
    }
  },
  created() {
    this.fetchCities();
    this.fetchUserData();
  }
};
</script>
