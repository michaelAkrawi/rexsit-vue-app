<template>         
    <div class="sign-container">                
           <h2>
               {{ $t("signup.register")}}
           </h2>       
        <facebook-login buttonPrefix="הרשמה"></facebook-login>        
        <div>
            <span> {{$t("signup.or")}} </span>
         </div>         
       <form>
            <div class="form-group">
                <label for="txb-firstname"> {{$t("user.firstname")}} </label>
                <input type="text" id="txb-firstname" class="form-control">
            </div>
            <div>
                <label for="txb-lastname"> {{$t("user.lastname")}} </label>
                <input type="text" id="txb-lastname" class="form-control">
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
              <button class="btn btn-primary btn-block"> {{ $t("signup.register")}}</button>
            </div>            
       </form>       
    </div>
        
    
    
</template>

<script>

console.log(this.$t);



import FacebookLogin from "../components/FacebookLogin.vue";

export default {
  name: "app",
  components: {
    "facebook-login": FacebookLogin
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
