<template>
    <div class="login-container">
        <h2>
          {{$t("user.login")}}
        </h2>
        <facebook-login :button-prefix=getFacebookButtonText()></facebook-login>
        <div>
            <span> {{$t("signup.or")}} </span>
         </div>     
        <div class="form-group">
            <label for="txb-email"> {{$t("user.email")}} </label>
            <input type="email" id="txb-email" class="form-control" dir="ltr">
        </div>
        <div class="form-group">
            <label for="txb-password"> {{$t("user.password")}} </label>
            <input type="password" id="txb-password" class="form-control">
        </div>
        <div>
            <button class="btn btn-block btn-primary">{{$t("user.login")}} </button>
        </div>
    </div>
    
</template>

<script>
import FacebookLogin from "../components/FacebookLogin.vue";

export default {
  name: "app",
  components: {
    "facebook-login": FacebookLogin
  },
  methods:{
      getFacebookButtonText (){
          return this.$t("user.login")
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


