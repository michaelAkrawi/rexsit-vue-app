<template>         
    <div class="sign-container">
        
        <div class="sign-header">
           <h2>
               {{ $t("signup.register")}}
           </h2>
       </div>                  
        <div id="facebook-button" >
                <span> {{ $t("signup.facebook") }} </span>
                <i class="fab fa-facebook"></i>
        </div>       
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
import { loadFbSdk, getFBLoginStatus } from "../scripts/facebook.js";


export default {
  name: "app",
  mounted: function() {
    loadFbSdk("211055006431121", "v3.1", function() {
      getFBLoginStatus(function(response) {
        console.log(response);
      });
    });
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

#facebook-button {
  background-color: #4267b2;
  color: #fff;
  border-radius: 4px;
  width: 90%;
  height: 40px;
  position: relative;
  cursor: pointer;
  width: 99%;
  margin-bottom: 15px;
}

#facebook-button span {
  display: inline-block;
  margin-top: 10px;
}

#facebook-button svg {
  font-size: 24px;
  position: absolute;
  left: 15px;
  top: 8px;
}

form {
  margin-top: 15px;
}
</style>
