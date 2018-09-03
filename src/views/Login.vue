<template>
    <div class="login-container">
        <h2>
          {{$t("login")}}
        </h2>
        <facebook-login :button-prefix=text></facebook-login>
        <div>
            <span> {{$t("or")}} </span>
         </div>     
        <div class="form-group">
            <label for="txb-email"> {{$t("email")}} </label>
            <input type="email" id="txb-email" class="form-control" dir="ltr" v-model="email">
        </div>
        <div class="form-group">
            <label for="txb-password"> {{$t("password")}} </label>
            <input type="password" id="txb-password" class="form-control" v-model="password">
        </div>
        <div>
            <button class="btn btn-block btn-primary" @click="">{{$t("login")}} </button>
        </div>
    </div>
    
</template>

<script>
import FacebookLogin from "../components/FacebookLogin.vue";
import { userService } from "../services/users-service.js";

export default {
  name: "app",
  components: {
    "facebook-login": FacebookLogin
  },
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    text() {
      return this.$t("login");
    }
  },
  methods: {
    login() {
      userService.login(this.email, this.password);
    }
  }
};
</script>

<style>
.login-container {
  text-align: center;
  font-weight: 600;
  margin: auto;
  width: 500px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  background-color: #fff;
}

.login-container h2 {
  margin-bottom: 25px;
}

form {
  margin-top: 15px;
}
</style>


