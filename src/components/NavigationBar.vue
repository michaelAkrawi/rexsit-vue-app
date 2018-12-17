<template>
    <header :class="{'home' : isHomeView}">
     <div id="navbar" role="nav" :class="[{ 'navbar-transparent': isHomeView }, 'row justify-content-between ml-0 mr-0']">
       <div class= "col-2">
          <router-link class="brand-logo" v-bind:to="'/'"> 
              <img class="brand-img" src="../assets/Rexsit-03.png">
          </router-link>          
       </div>
       <div class='navbar-links col-4'> 
         <div v-if="isLoggedIn == false">
          <router-link class="nav-item nav-link" v-bind:to="'/signup'">{{$t("register")}}</router-link> 
          <router-link class="nav-item nav-link" v-bind:to="'/login'"> {{$t("login")}} </router-link>  
         </div>
         <div v-else>
          <user-profile-menu></user-profile-menu>
        </div>  
       </div> 
       
       <a id="toggle-menu" role="button" data-target=".navbar-links" data-toggle="collapse" @click="toggle=true">
            <i class="fas fa-align-justify"></i>
          </a>    
     </div>
    </header>

</template>

<script>
import UserProfileMenu from "../components/UserProfileMenu.vue";

export default {
  name: "nav-bar",
  data: function() {
    return {
      headerClass: "",
      showLinksStyle: ""
    };
  },
  components: {
    "user-profile-menu": UserProfileMenu
  },
  computed: {
    isHomeView() {
      return this.$route.path === "/";
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    toggle() {
      this.showLinksStyle = "block";
    }
  }
};
</script>


<style scoped>
header {
  background-image: unset;
  height: unset;
}

.container {
  margin-top: 0px !important;
}

.brand-logo {
  position: absolute;
  top: -30px;
  right: 15px;
}

.brand-logo img {
  width: 130px;
  height: 130px;
}



header #navbar {
  background-color: #fff;
  border-color: #e7e7e7;
  box-shadow: 0 0 10px grey;
  min-height: 65px;
}

.navbar-transparent {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.navbar-nav {
  direction: rtl;
}

.navbar-links {
  text-align: left;
  padding-top: 15px;
}

.navbar-links a {
  text-decoration: none;
  color: #333 !important;
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  padding: 0px 0px 0px 5px;
}

.navbar-links a:first-child {
  border-left: 2px solid #333;
}

.navbar-left {
  float: left;
  margin-left: 15px;
  direction: ltr;
}

#toggle-menu {
  display: none;
}

@media screen and (max-width: 700px) {
  #toggle-menu {
    display: inline;
    position: absolute;
    left: 5px;
    top: 15px;
    font-size: 22px;
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;

    padding: 5px;
  }

  .navbar-links {
    display: none;
  }

  .navbar-links a {
    display: block;
    border: none;
    background-color: #fff;
  }
}
</style>
