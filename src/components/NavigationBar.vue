<template>
    <header :class="{'home' : isHomeView}">
     
     <nav :class="[{ 'navbar-transparent': isHomeView }, 'navbar navbar-expand-lg']">        
        <router-link class="navbar-brand" v-bind:to="'/'">          
          <img src="../assets/Rexsit-03.png">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
   
        <div class="collapse navbar-collapse navbar-left" id="navbarNav">
          <div class="navbar-nav">          
            <div v-if="isLoggedIn == false">
              <router-link class="nav-item nav-link" v-bind:to="'/signup'">{{$t("register")}}</router-link>                            
              <router-link class="nav-item nav-link" v-bind:to="'/login'"> {{$t("login")}} </router-link>          
            </div>
            <div v-else>
              <div id= "profile-img">
                <img :src="getProfileImage"/>
              </div>
            </div>
          </div>
            
          </div>              
      </nav>
    </header>

</template>

<script>
import { getAuthUser } from "../scripts/auth.js";
export default {
  name: "nav-bar",
  data: function() {
    return {
      headerClass: "",
      loggedUser: null
    };
  },
  mounted() {
    console.log('mounted');
    this.loggedUser = getAuthUser();
  },
  computed: {
    isHomeView() {
      return this.$route.path === "/";
    },
    isLoggedIn() {
      const user = getAuthUser();
      return user != null;
    }
  },
  methods: {
    getProfileImage() {
      if (loggedUser.oAuthProvider == "facebook") {
        getFBProfilePicture(user.oAuthUniqueId)
          .then(response => {
            console.log(response);
          })
          .catch(reject => {
            console.log(reject);
          });
      }
    }
  }
};
</script>


<style scoped>
header {
  background-image: unset;
  height: unset;
}

.navbar-brand img {
  width: 130px;
  height: 130px;
  position: absolute;
  top: -30px;
}

header.home {
  background-image: url("../assets/hero_dog_blur.jpg");
  height: 500px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 35% 75%;
}

header .navbar {
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



</style>
