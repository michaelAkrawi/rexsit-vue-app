<template>
    <form>
      <div class="row margin-bottom-x20">
        <div class="col-6">                                                                                 
          <div>
            <h4> {{$t("yourProfilePhoto")}}</h4>
            <p class="text-muted"> {{$t("profilePhotoDescription")}}</p>
            <button id="btn-upload-image" class="btn-secondary" type="button">
              {{$t("uploadImage")}}
              <i class="fas fa-camera"></i>
            </button>
          </div>
         </div>
         <div v-if="showProfileImage" class="col-6">
            <img :src="profile.profileImageURL" class="large-profile-image img-fluid">
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
</template>

<script>
import CityAutoComplete from "../components/CityAutoComplete.vue";
import DateDropDown from "../components/DateDropDown.vue";
import { getFBProfilePicture } from "../scripts/facebook.js";
import { getAuthUser } from "../scripts/auth";
import { apihelper } from "../scripts/apihelper.js";
import { userService } from "../services/users-service";
import SimpleVueValidation from "simple-vue-validator";
const validator = SimpleVueValidation.Validator;

export default {
  name: "profile-general-info",
  data() {
    return {
      cities: [],
      profile: {
        firstName: "",
        lastName: "",
        cityID: 0,
        address: "",
        birthDate: "",
        cellPhoneNumber: "",
        profileImageURL: "",
        dogOwner: undefined
      }
    };
  },
  components: {
    "city-autocomplete": CityAutoComplete,
    "date-drop-down": DateDropDown
  },
  computed: {
    showProfileImage() {
      let show = this.$store.getters.isFacebooKSDKLoaded;
      if (show) {
        this.getProfileImage();
      }
      return show;
    }
  },
  methods: {
    getProfileImage: function() {
      const user = getAuthUser();
      const vm = this;
      getFBProfilePicture(user.oAuthUniqueId).then(response => {
        vm.profile.profileImageURL = response.data.url;
      });
    },
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
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onStepCompleted() {
      return new Promise((resolve, reject) => {
        this.$validate().then(succ => {
          if (succ) {
            this.updatePersonalInfo();
          }

          resolve(succ);
        });        
      });
    },
    updatePersonalInfo() {   
      userService.updatePersonalInfo(this.profile).catch(error => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.fetchCities();
    this.fetchUserData();
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
    }
  }
};
</script>

