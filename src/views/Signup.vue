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
                <input type="text" id="txb-firstname" class="form-control">
            </div>
            <div>
                <label for="txb-lastname"> {{$t("lastname")}} </label>
                <input type="text" id="txb-lastname" class="form-control">
            </div>
            
            <div class="form-group">
                <label for="txb-email"> {{$t("email")}} </label>
                <input type="email" id="txb-email" class="form-control" dir="ltr" v-model="email" required>
            </div>
             <div class="form-group">
                <label for="txb-password"> {{$t("password")}} </label>
                <input type="password" id="txb-password" class="form-control" v-model="password" required>
            </div>        
            <div>
              <button class="btn btn-primary btn-block" @click="register()"> {{ $t("register")}}</button>
            </div>            
       </form>       
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
      return this.$t("register");
    }
  },
  methods: {
    register() {      
      userService.register(this.email, this.password)
      .then(reponse => {
        console.log(reponse);
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
