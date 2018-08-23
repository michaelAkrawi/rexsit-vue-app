<template >
  <div id="app"  dir="rtl">
    <header :class="{'home' : isHomeView}">
      <nav class="navbar navbar-expand-lg">        
        <router-link class="navbar-brand" v-bind:to="'/'">Rexsit</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
   
        <div class="collapse navbar-collapse navbar-left" id="navbarNav">
          <div class="navbar-nav">          
            <router-link class="nav-item nav-link" v-bind:to="'/sign-up'">{{$t("register")}}</router-link>                            
            <router-link class="nav-item nav-link" v-bind:to="'/login'"> {{$t("login")}} </router-link>          
          </div>      
        </div>
      </nav>
    </header>
            
    <div class="container">
        <router-view></router-view>
    </div>
<p>

    
    </p>
  </div>
</template>

<script>
export default {
  name: "app",
  data: function() {
    return {
      headerClass: ''
    };
  },
  computed: {
    isHomeView() {
      return this.$route.path === '/';
    }
  },
  created() {
    this.headerClass = 'header-no-image';
  }
};
</script>

<style>
header {
  background-image: unset;
  height: unset;
}

header.home {
  background-image: url("./assets/hero_dog_blur.jpg");
  height: 500px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 35% 75%;
}

body {
  background-color: #f7f7f7;
  color: #333;
  font-size: 14px;
}

header .navbar {
  background-color: #fff;
  border-color: #e7e7e7;
  box-shadow: 0 0 10px grey;
}

.btn-primary {
  background-color: #00d1b2;
  color: fff;
  border-color: transparent;
  cursor: pointer;
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

.navbar-left {
  float: left;
  margin-left: 15px;
  direction: ltr;
}

.container {
  margin-top: 15px;
}
</style>
