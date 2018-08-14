<template >
  <div id="app"  dir="rtl">
    <nav class="navbar navbar-expand-lg">
       <a class="navbar-brand" href="#">Rexsit</a>
   
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
   
    <div class="collapse navbar-collapse navbar-left" id="navbarNav">
      <div class="navbar-nav">          
            <router-link class="nav-item nav-link" v-bind:to="'/sign-up'">{{$t("signup.register")}}</router-link>                            
            <router-link class="nav-item nav-link" v-bind:to="'/login'"> {{$t("user.login")}} </router-link>          
      </div>
      
    </div>
    </nav>
    <div class="container">
        <router-view></router-view>
    </div>
<p>

    
    </p>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
body {
  background-color: #f7f7f7;
  color: #333;
  font-size: 14px;
}

.btn-primary {
  background-color: #00d1b2;
  color: fff;
  border-color: transparent;
}

.btn-primary:hover {
  background-color: #00c4a7;
  border-color: transparent;
}

.navbar-nav {
  direction: rtl;
}

.navbar-nav a {
  text-decoration: none;
  color: #333 !important;
  font-weight: 600;
  font-size: 16px;

  padding: 0px 0px 0px 5px;
}

.navbar-nav a:first-child {
  border-left: 2px solid #333;
}

.navbar {
  background-color: #fff;
  border-color: #e7e7e7;
  box-shadow: 0 0 10px grey;
}

.navbar-left {
  float: left;
  margin-left: 15px;
  direction: ltr;
}

.container {
  margin-top: 15px;
}
</style>
