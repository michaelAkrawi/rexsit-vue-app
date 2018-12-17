<template>
   <div> 
    <div class="row mt-5">
        <div class="col-6">
          <radio-select id="btn-i-have-a-dog" name="dog-owner" label="i-am-dog-owner" v-model="dogs.radioButtonValue" :checked="userOwnsADog"  skin="primary">                                                       
              <i class="fas fa-dog large-svg-icon"></i>                            
              <p class="mb-0"> {{$t("iAmDogOwner")}}</p>                                                                             
          </radio-select>
        </div>                                                                                    
        <div class="col-6">
          <radio-select id="btn-dont-have-a-dog" name="dog-owner"  label="i-am-not-dog-owner" v-model="dogs.radioButtonValue" :checked="userDontOwnsADog" skin="danger">
            <i class="fas fa-dog large-svg-icon"></i>
            <p class="mb-0">{{$t("iAmNotDogOwner")}}</p>                            
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
   </div>
</template>

<style scoped>
.large-svg-icon {
  font-size: 22px;
}
</style>


<script>
import RadioSelect from "../components/RadioSelect.vue";
import { apihelper } from "../scripts/apihelper.js";
import { dogOwnerService } from "../services/dog-owner-service.js";
import SimpleVueValidation from "simple-vue-validator";
const validator = SimpleVueValidation.Validator;

export default {
  name: "profile-dog-info",
  data() {
    return {
      breeds: [],
      dogs: {
        dogName: "",
        breedID: 0,
        ageMonths: null,
        ageYears: null,
        sex: null,
        radioButtonValue: ""
      }
    };
  },
  components: {
    "radio-select": RadioSelect
  },
  computed: {
    userOwnsADog() {
      return this.dogs.radioButtonValue == "i-am-dog-owner";
    },
    userDontOwnsADog() {
      return this.dogs.radioButtonValue == "i-am-not-dog-owner";
    }
  },
  methods: {
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
    fetchDogInfo() {
      var vm = this;
      dogOwnerService
        .getDogInfo()
        .then(response => {
          vm.dogs.radioButtonValue = "i-am-dog-owner";
          vm.dogs.dogName = response.dogName;
          vm.dogs.breedID = response.breedID;
          vm.dogs.ageYears = response.ageYears;
          vm.dogs.ageMonths = response.ageMonths;
          vm.dogs.sex = response.sex.toLowerCase();
        })
        .catch(error => {
          if (error.response.statusCode == "404") {
            vm.dogs.radioButtonValue = "i-am-not-dog-owner";
          } else {
            console.log(error);
          }
        });
    },
    onStepCompleted() {
      return new Promise((resolve, reject) => {
        this.$validate().then(succ => {
          if (succ) {
            this.updateDogsInfo();
          }
          resolve(succ);
        });
      });
    },
    updateDogsInfo() {
      dogOwnerService.updateDogInfo(this.dogs).catch(error => {
        console.log(error);
      });
    }
  },
  validators: {
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
    this.fetchDogBreeds();
    this.fetchDogInfo();
  }
};
</script>

