<template>
     <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-lg-7 col-md-auto">
            <wizard :steps="steps" :on-next-button-clicked="onWizardNextStep">
                <wizard-step slot="details">
                    <form>
                      <div class="row margin-bottom-x20">
                          <div class="col-6">                                                                                 
                             <div>
                               <h4> {{$t("yourProfilePhoto")}}</h4>
                                <p class="text-muted">
                                 {{$t("profilePhotoDescription")}}
                                </p>
                               <button id="btn-upload-image" class="btn-secondary" type="button">
                                 {{$t("uploadImage")}}
                                 <i class="fas fa-camera"></i>
                               </button>
                             </div>
                          </div>
                          <div v-if="showProfileImage" class="col-6">
                              <img :src="profile.profileImageURL" class="large-profile-image">
                          </div>
                      </div>
                      <div class="row">
                        <div class="col-6">
                          <div class="form-group">
                            <label for="txb-first-name"> {{$t("firstname")}} </label>
                            <input type="text" id="txb-first-name" class="form-control" v-model="profile.firstName" :class="{'form-control-has-error': validation.hasError('profile.firstName')}" />
                            <div class="error-message">{{ validation.firstError('profile.firstName') }}</div>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="form-group">
                            <label for="txb-last-name">{{$t("lastname")}} </label>
                            <input type="text" id="txb-last-name" class="form-control" v-model="profile.lastName" :class="{'form-control-has-error': validation.hasError('profile.lastName')}"/>
                             <div class="error-message">{{ validation.firstError('profile.lastName') }}</div>
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
                          <input type="tel" id="txb-phone"  class="form-control" v-model="profile.cellPhoneNumber" :class="{'form-control-has-error': validation.hasError('profile.cellPhoneNumber')}"/>
                           <div class="error-message">{{ validation.firstError('profile.cellPhoneNumber') }}</div>
                        </div>
                        
                        <div class="row">
                          <div class="col-12">
                            <label for="">{{$t("birthdate")}}</label>
                          </div>
                        </div>
                        <date-drop-down v-model="profile.birthDate" :selected-date="profile.birthDate"></date-drop-down>             
                      </form>
                  </wizard-step>
                  <wizard-step slot="dogs">                    
                    <div class="row mt-5">
                      <div class="col-6">
                          <radio-select id="btn-i-have-a-dog" name="dog-owner" label="i-am-dog-owner" v-model="dogs.radioButtonValue" :checked="userOwnsADog"  skin="primary">                                                       
                              <i class="fas fa-dog large-svg-icon"></i>                            
                              <p class="mb-0">
                                  {{$t("iAmDogOwner")}}
                              </p>                                                                             
                          </radio-select>
                      </div>                                                                                    
                      <div class="col-6">
                        <radio-select id="btn-dont-have-a-dog" name="dog-owner"  label="i-am-not-dog-owner" v-model="dogs.radioButtonValue" :checked="userDontOwnsADog" skin="danger">
                            <i class="fas fa-dog large-svg-icon"></i>
                            <p class="mb-0">
                                {{$t("iAmNotDogOwner")}}
                            </p>                            
                        </radio-select>
                      </div>
                    </div>
                    <div v-show="dogs.radioButtonValue == 'i-am-dog-owner'">
                        <div class="form-group">
                            <label for="txb-dog-name" :class="{'error-message': validation.hasError('dogs.dogName')}">{{$t("dogName")}}</label>
                            <input type="text" id="txb-dog-name" class="form-control" v-model="dogs.dogName" :class="{'form-control-has-error': validation.hasError('dogs.dogName')}">    
                             <div class="error-message">{{ validation.firstError('dogs.dogName') }}</div>
                    
                        </div>                 
                        <div class="form-group">
                            <label for="drop-down-breed"> {{$t("dogBreed")}}</label>
                            <select id="drop-down-breed" class="form-control" v-model="dogs.breedID">
                              <option value="0">{{$t("other")}}</option>
                              <option v-for="b in breeds" :value="b.id">{{b.name}}</option>
                            </select>
                        </div>
                        <div class="row">
                          <div class="col-4">
                              <div class="form-group">
                                <label for="txb-age-years" :class="{'error-message': validation.hasError('dogs.ageYears')}"> {{$t("ageByYears")}} </label>
                                <input id="txb-age-years" type="text" class="form-control" v-model="dogs.ageYears" :class="{'form-control-has-error': validation.hasError('dogs.ageYears')}">
                                 <div class="error-message">{{ validation.firstError('dogs.ageYears') }}</div>
                              </div>                        
                          </div>
                          <div class="col-4">
                            <div class="form-group">
                              <label for="txb-age-month">{{$t("ageByMonths")}} </label>
                              <input id="txb-age-months" type="text" class="form-control" v-model="dogs.ageMonths">
                            </div>
                          </div>
                          <div class="col-4">
                            <div class="form-group">
                              <label :class="{'error-message' : validation.hasError('dogs.sex')}"> {{$t("sex")}}</label>
                              <div class="row">
                                <div class="col-6">
                                  <label for="rb-male">{{$t("male")}}</label>
                                  <input type="radio" name="rb-gendar" value="male"  id="rb-male" v-model="dogs.sex">
                                </div>
                                <div class="col-6">
                                    <label for="rb-female">{{$t("female")}}</label>
                                    <input type="radio" name="rb-gendar" value="female" id="rb-female" v-model="dogs.sex" >
                                </div>                                
                              </div>
                              <div class="error-message"> {{validation.firstError('dogs.sex')}} </div>
                            </div>
                        </div>                        
                      </div>                                 
                    </div>
                  </wizard-step>
                    
                  <wizard-step slot="services">
                     <div class="form-group form-check">
                       <checkbox-vue v-model="services.dogWalker.active" id="chk-dog-walker" :checked="isDogWalker">{{$t("dogWalker")}}</checkbox-vue>
                     </div>
                     <p class="text-muted">
                       {{$t("dogWalkerServiceDescription")}}
                     </p>
                     <div class="form-group">
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
                     <div class="form-group">
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
                     <div class="form-group">
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
.large-profile-image {
  width: 250px;
  height: 250px;
}

.large-svg-icon {
  font-size: 22px;
}
</style>



<script>
import Wizard from "../components/Wizard.vue";
import WizardStep from "../components/WizardStep.vue";
import CityAutoComplete from "../components/CityAutoComplete.vue";
import DateDropDown from "../components/DateDropDown.vue";
import Checkbox from "../components/Checkbox.vue";
import RadioSelect from "../components/RadioSelect.vue";
import { apihelper } from "../scripts/apihelper.js";
import { userService } from "../services/users-service";
import { dogOwnerService } from "../services/dog-owner-service.js";
import { dogWalkersService } from "../services/dog-walker-service.js";
import { dogSitterService } from "../services/dog-sitter-service.js";
import { getAuthUser } from "../scripts/auth";
import SimpleVueValidation from "simple-vue-validator";
import { getFBProfilePicture } from "../scripts/facebook.js";
const validator = SimpleVueValidation.Validator;

export default {
  name: "app",
  components: {
    wizard: Wizard,
    "wizard-step": WizardStep,
    "city-autocomplete": CityAutoComplete,
    "date-drop-down": DateDropDown,
    "checkbox-vue": Checkbox,
    "radio-select": RadioSelect
  },
  data: function() {
    return {
      cities: [],
      breeds: [],
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
        },
        {
          name: "services",
          icon: "fas fa-hand-holding-usd",
          title: this.$t("servicesAndRates"),
          active: false
        }
      ],
      profile: {
        firstName: "",
        lastName: "",
        cityID: 0,
        address: "",
        birthDate: "",
        cellPhoneNumber: "",
        profileImageURL: "",
        dogOwner: undefined
      },
      dogs: {
        dogName: "",
        breedID: 0,
        ageMonths: null,
        ageYears: null,
        sex: null,
        radioButtonValue: ""
      },
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

  computed: {
    showProfileImage() {
      let show = this.$store.getters.isFacebooKSDKLoaded;
      if (show) {
        this.getProfileImage();
      }
      return show;
    },
    userOwnsADog() {
      return this.dogs.radioButtonValue == "i-am-dog-owner";
    },
    userDontOwnsADog() {
      return this.dogs.radioButtonValue == "i-am-not-dog-owner";
    },
    isDogWalker() {
      return this.services.dogWalker.active;
    },
    isDogSitter() {
      return this.services.dogSitter.active;
    }
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
    fetchDogBreeds() {
      var vm = this;
      apihelper
        .fetchDogBreeds()
        .then(response => {
          response.forEach(b => {
            vm.breeds.push(b);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchUserData() {
      var vm = this;
      userService
        .get()
        .then(response => {
          if (response.data) {
            vm.profile.firstName = response.data.firstName;
            vm.profile.lastName = response.data.lastName;
            vm.profile.cityID = response.data.cityID;
            vm.profile.address = response.data.address;
            vm.profile.cellPhoneNumber = response.data.cellPhoneNumber;
            vm.profile.birthDate = response.data.birthDate;
            if (response.data.dogOwner !== null) {
              if (response.data.dogOwner == true) {
                vm.dogs.radioButtonValue = "i-am-dog-owner";
                vm.fetchDogInfo();
              } else vm.dogs.radioButtonValue = "i-am-not-dog-owner";
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchDogInfo() {
      var vm = this;
      dogOwnerService
        .getDogInfo()
        .then(response => {
          if (response !== null) {
            vm.dogs.dogName = response.dogName;
            vm.dogs.breedID = response.breedID;
            vm.dogs.ageYears = response.ageYears;
            vm.dogs.ageMonths = response.ageMonths;
            vm.dogs.sex = response.sex.toLowerCase();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
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
    getProfileImage: function() {
      const user = getAuthUser();
      const vm = this;
      getFBProfilePicture(user.oAuthUniqueId).then(response => {
        vm.profile.profileImageURL = response.data.url;
      });
    },
    onWizardNextStep(step) {
      return new Promise((resolve, reject) => {
        const arr = this.getStepValidators(step);
        this.$validate(arr).then(succ => {
          if (succ) {
            this.callStepFunction(step);
            resolve();
          }
        });
      });
    },
    callStepFunction(step) {
      if (step.name == "details") {
        this.updatePersonalInfo();
      } else if (step.name == "dogs") {
        this.updatePersonalInfo();
        if (this.profile.dogOwner == true) {
          this.updateDogsInfo();
        }
      } else if (step.name == "services") {
        this.updateServices();
      }
    },
    getStepValidators(step) {
      switch (step.name) {
        case "details":
          return [
            "profile.firstName",
            "profile.lastName",
            "profile.cellPhoneNumber"
          ];
        case "dogs": {
          if (this.dogs.radioButtonValue == "i-am-dog-owner")
            return [
              "dogs.dogName",
              "dogs.ageYears",
              "dogs.sex",
              "dogs.ageMonths"
            ];
          else return [];
        }
      }
    },
    updatePersonalInfo() {
      if (this.dogs.radioButtonValue != "")
        this.profile.dogOwner = this.dogs.radioButtonValue == "i-am-dog-owner";
      userService.updatePersonalInfo(this.profile).catch(error => {
        console.log(error);
      });
    },
    updateDogsInfo() {
      dogOwnerService.updateDogInfo(this.dogs).catch(error => {
        console.log(error);
      });
    },
    updateServices() {
      if (this.services.dogWalker.active) {
        dogWalkersService.update(this.services.dogWalker);
      }
      if (this.services.dogSitter.active) {        
        dogSitterService.update(this.services.dogSitter);
      }
    }
  },
  validators: {
    "profile.firstName": function(value) {
      return validator.value(value).required();
    },
    "profile.lastName": function(value) {
      return validator.value(value).required();
    },
    "profile.cellPhoneNumber": function(value) {
      return validator.value(value).integer();
    },
    "dogs.dogName": function(value) {
      return validator.value(value).required();
    },
    "dogs.ageYears": function(value) {
      return validator
        .value(value)
        .required()
        .integer()
        .greaterThan(0);
    },
    "dogs.sex": function(value) {
      return validator.value(value).required();
    },
    "dogs.ageMonths": function(value) {
      return validator
        .value(value)
        .integer()
        .greaterThan(0);
    }
  },
  mounted() {
    this.fetchCities();
    this.fetchDogBreeds();
    this.fetchUserData();
    this.fetchDogWalkerData();
    this.fetchDogSitterData();
  }
};
</script>
