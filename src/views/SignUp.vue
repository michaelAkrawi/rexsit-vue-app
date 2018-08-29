<template>         
    <div class="sign-container">                
           <h2>
               {{ $t("register")}}
           </h2>       
        <facebook-login :button-prefix=text></facebook-login>        
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
                <input type="text" id="txb-email" name="email" class="form-control" :class="{'form-control-has-error': validation.hasError('userData.email')}" dir="ltr" v-model="userData.email" >
                <div class="error-message">{{ validation.firstError('userData.email') }}</div>
            </div>
             <div class="form-group">
                <label for="txb-password"> {{$t("password")}} </label>
                <input type="password" id="txb-password" class="form-control" :class="{'form-control-has-error': validation.hasError('userData.password')}" v-model="userData.password"  dir="ltr">
                <div class="error-message">{{ validation.firstError('userData.password') }}</div>

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
const Validator = SimpleVueValidation.Validator;

export default {
  name: "app",
  components: {
    "facebook-login": FacebookLogin
  },
  data: function() {
    return {
      userData: User
    };
  },
  computed: {
    text() {
      return this.$t("register");
    }
  },
  methods: {
    register() {
      this.$validate().then(succ => {
        if (succ) {
          userService.register(this.userData).then(response => {
            storeAuthUser(response.data);
            this.$router.push({
              path: `profile/${response.data.FirstName}${
                response.data.LastName
              }`
            });
          });
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
  },
  mounted() {
    console.log(this.fields);
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
}
</style>
