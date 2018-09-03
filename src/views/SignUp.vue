<template>         
    <div class="sign-container">                
           <h2>
               {{ $t("register")}}
           </h2>       
        <facebook-login :button-prefix=text :callback=facebookRegister></facebook-login>        
        <div>
            <span> {{$t("or")}} </span>
         </div>         
       <form v-on:submit.prevent>
            <div class="form-group">
                <label for="txb-firstname"> {{$t("firstname")}} </label>
                <input type="text" id="txb-firstname" class="form-control" :class="{'form-control-has-error': validation.hasError('userData.firstName')}" v-model="userData.firstName">
                <div class="error-message">{{ validation.firstError('userData.firstName') }}</div>
            </div>
            <div class="form-group">
                <label for="txb-lastname"> {{$t("lastname")}} </label>
                <input type="text" id="txb-lastname" class="form-control" :class="{'form-control-has-error': validation.hasError('userData.lastName')}"  v-model="userData.lastName">
                <div class="error-message">{{ validation.firstError('userData.lastName') }}</div>
            </div>
            
            <div class="form-group">
                <label for="txb-email"> {{$t("email")}} </label>
                <input type="text" id="txb-email" name="email" class="form-control" :class="{'form-control-has-error': emailErrors}" dir="ltr" v-model="userData.email" >
                <div  class="error-message">{{ validation.firstError('userData.email') }}</div>
                <div v-if="existed" class="error-message"> {{this.$t("existedUser")}}</div>                
            </div>
             <div class="form-group">
                <label for="txb-password"> {{$t("password")}} </label>
                <vue-password  :class="{'password-control-error': validation.hasError('userData.password')}"  v-model="userData.password" dir="ltr"> </vue-password>
                <div class="error-message">{{ validation.firstError('userData.password') }}</div>
            </div>        
            <div class="form-group">
                
            </div>
            <div>
              <button class="btn btn-primary btn-block" @click="register()"> {{ $t("register")}}</button>
            </div>            
       </form>       
    </div>
        
    
    
</template>

<script>
import FacebookLogin from "../components/FacebookLogin.vue";
import { userService, User } from "../services/users-service.js";
import { storeAuthUser } from "../scripts/auth";
import SimpleVueValidation from "simple-vue-validator";
import VuePassword from "vue-password";
import { getFBInfo } from "../scripts/facebook.js";
const Validator = SimpleVueValidation.Validator;

export default {
  name: "app",
  components: {
    "facebook-login": FacebookLogin,
    "vue-password": VuePassword
  },
  data: function() {
    return {
      userData: User,
      existed: false
    };
  },
  computed: {
    text() {
      return this.$t("register");
    },
    emailErrors() {
      return this.validation.hasError("userData.email") || this.existed;
    }
  },
  methods: {
    facebookRegister(response) {
      getFBInfo(response.userID).then(response => {
        const u = this.fillDataFromFacebookResponse(response);
        userService
          .register(u)
          .then(response => {
            console.log("connected");
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },

    fillDataFromFacebookResponse(response) {
      return {
        firstname: response.first_name,
        lastName: response.last_name,
        email: response.email,
        oAuthProvider: "facebook",
        oAuthUniqueId: response.id
      };
    },
    register() {
      this.$validate().then(succ => {
        if (succ) {
          this.login(this.userData);
        }
      });
    },
    login(user) {
      userService
        .register(user)
        .then(response => {
          storeAuthUser(response.data);
          this.$router.push({
            path: `profile/${response.data.FirstName}${response.data.LastName}`
          });
        })
        .catch(reject => {
          if (reject.response.status == "409") {
            this.existed = true;
          }
        });
    }
  },
  validators: {
    "userData.firstName": function(value) {
      return Validator.value(value).required();
    },
    "userData.lastName": function(value) {
      return Validator.value(value).required();
    },
    "userData.email": function(value) {
      return Validator.value(value)
        .required()
        .email();
    },
    "userData.password": function(value) {
      return Validator.value(value).required();
    }
  }
};
</script>



<style>
.sign-container {
  text-align: center;
  font-weight: 600;
  margin: auto;
  width: 500px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  background-color: #fff;
}

.sign-container h2 {
  margin-bottom: 25px;
}

form {
  margin-top: 15px;
}

.error-message {
  color: #a94442;
}

.form-control-has-error {
  box-shadow: none;
  border-color: #a94442;
  -webkit-box-shadow: 0 0 0 30px white inset;
}

.password-control-error input.form-control {
  box-shadow: none;
  border-color: #a94442;
  -webkit-box-shadow: 0 0 0 30px white inset;
}
</style>
