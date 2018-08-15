<template>         
    <div class="sign-container">                
           <h2>
               {{ $t("signup.register")}}
           </h2>       
        <facebook-login :button-prefix=getFacebooButtonText()></facebook-login>        
        <div>
            <span> {{$t("or")}} </span>
         </div>         
       <form>
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
                <input type="email" id="txb-email" class="form-control" dir="ltr">
            </div>
             <div class="form-group">
                <label for="txb-password"> {{$t("password")}} </label>
                <input type="password" id="txb-password" class="form-control">
            </div>        
            <div>
              <button class="btn btn-primary btn-block"> {{ $t("register")}}</button>
            </div>            
       </form>       
    </div>
        
    
    
</template>

<script>
import FacebookLogin from "../components/FacebookLogin.vue";

export default {
  name: "app",
  components: {
    "facebook-login": FacebookLogin
  },
  computed: {},
  methods: {
    getFacebooButtonText: function() {
      return this.$t("register");
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
