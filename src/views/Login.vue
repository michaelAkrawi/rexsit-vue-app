<template>
    <div class="login-container">
        <h2>
          {{$t("login")}}
        </h2>
        <facebook-login :button-prefix=text :callback=loginWithFacebook></facebook-login>
        
            <div>
                <span> {{$t("or")}} </span>
            </div>     
            <form v-on:submit.prevent>
            <div class="form-group">
                <label for="txb-email"> {{$t("email")}} </label>
                <input type="email" id="txb-email" class="form-control" dir="ltr" v-model="userData.email">
                <div class="error-message">{{validation.firstError('userData.email')}} </div>
            </div>
            <div class="form-group">
                <label for="txb-password"> {{$t("password")}} </label>
                <input type="password" id="txb-password" class="form-control" v-model="userData.passwordText" dir="ltr">
                <div class="error-message">{{validation.firstError('userData.passwordText')}} </div>
            </div>
            <div v-if="wrongCredentials">            
                <div class="error-message">
                    {{$t("wrongCredentials")}}
                </div>
            </div>
            <div>
                <button class="btn btn-block btn-primary" @click="login">{{$t("login")}} </button>
            </div>
        </form>

        <div class="footer-container top-border">            
            <router-link v-bind:to="'/reset-password'"> {{$t("forgotPassword")}} </router-link>
        </div>
        <div class="footer-container">            
            <router-link v-bind:to="'/signup'"> {{$t("haventSignedUpYet")}} </router-link>
        </div>
    </div>
    
</template>

<script>
import FacebookLogin from "../components/FacebookLogin.vue";
import { userService, User } from "../services/users-service.js";
import { getFBInfo, fillUserDataFromReponse } from "../scripts/facebook.js";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;

export default {
  name: "app",
  components: {
    "facebook-login": FacebookLogin
  },
  data: function() {
    return {
      userData: User,
      wrongCredentials: false
    };
  },
  computed: {
    text() {
      return this.$t("login");
    }
  },
  methods: {
    login() {
      this.wrongCredentials = false;
      this.$validate().then(succ => {
        if (succ) {
          this.fetchUser(this.userData);
        }
      });
    },
    fetchUser(user) {
      userService
        .login(user)
        .then(response => {
          this.$store.dispatch("login", response.data).then(response => {
            this.$router.push("/");
          });
        })
        .catch(error => {                    
          if (error.response.status == "403") {
            this.wrongCredentials = true;
          } else {
            console.log(error);
          }
        });
    },
    loginWithFacebook(oAuthResponse) {
      getFBInfo(oAuthResponse.userID)
        .then(response => {
          const user = fillUserDataFromReponse(response);
          this.fetchUser(user);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  validators: {
    "userData.email": function(value) {
      return Validator.value(value).required();
    },
    "userData.passwordText": function(value) {
      return Validator.value(value).required();
    }
  }
};
</script>

<style scoped>
.login-container {
  text-align: center;
  font-weight: 600;
  margin: auto;
  width: 500px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  background-color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
}

.login-container h2 {
  margin-bottom: 25px;
}

form {
  margin-top: 15px;
}

.top-border {
  border-top: 1px solid #ddd;
}

.footer-container {
  padding: 10px;
  margin-top: 5px;
}

.error-message {
  color: #a94442;
}
</style>


