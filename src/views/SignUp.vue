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
                <input type="text" id="txb-firstname" class="form-control" required v-model="userData.firstName">
            </div>
            <div class="form-group">
                <label for="txb-lastname"> {{$t("lastname")}} </label>
                <input type="text" id="txb-lastname" class="form-control" required v-model="userData.lastName">
            </div>
            
            <div class="form-group">
                <label for="txb-email"> {{$t("email")}} </label>
                <input type="email" id="txb-email" class="form-control" dir="ltr" v-model="userData.email" required>
            </div>
             <div class="form-group">
                <label for="txb-password"> {{$t("password")}} </label>
                <input type="password" id="txb-password" class="form-control" v-model="userData.password" required dir="ltr">
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

export default {
  name: "app",
  components: {
    "facebook-login": FacebookLogin
  },
  data: function() {
    return {
      userData: new User()
    };
  },
  computed: {
    text() {
      return this.$t("register");
    }
  },
  methods: {
    register() {
      userService.register(this.userData).then(response => {
        storeAuthUser(response.data);
        this.$router.push({ path: `profile/${response.data.FirstName}${response.data.LastName}` });
      });
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
</style>
