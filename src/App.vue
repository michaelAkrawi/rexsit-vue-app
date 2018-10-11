<template >
  <div id="app"  dir="rtl">
   
    <nav-bar></nav-bar>
    <div class="container">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import { loadFbSdk } from "./scripts/facebook.js";
import config from "config";
import Axios from "axios";
import { userService } from "./services/users-service.js";
import { getAuthUser, authHeader } from "./scripts/auth";
import { store } from "./scripts/store.js";

let refreshTokenPromise;
function getRefreshedToken() {
  if (!refreshTokenPromise) {
    refreshTokenPromise = userService.refresh();
    refreshTokenPromise.then(
      resetRefreshTokenPromise,
      resetRefreshTokenPromise
    );
  }

  return refreshTokenPromise;
}

function resetRefreshTokenPromise() {
  refreshTokenPromise = null;
}

Axios.interceptors.response.use(null, error => {
  if (error.config && error.response && error.response.status === 401) {
    return getRefreshedToken().then(response => {
      store.dispatch("refresh", response.data).then(response => {
        error.config.headers = authHeader();
        error.config.baseURL = undefined;
        return Axios.request(error.config);
      });
    });
  }

  return Promise.reject(error);
});

async function refreshToken() {}

export default {
  name: "app",
  components: {
    "nav-bar": NavigationBar
  },
  beforeCreate() {
    const vm= this;
    loadFbSdk(config.facebookAppID, "v3.1", function() {
      vm.$store.dispatch('loadFBSDK').then(response => {
        
      });
    });
  }
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
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #00c4a7;
  border-color: transparent;
}

.container {
  margin-top: 15px;
  text-align: right;
}

.error-message {
  color: #a94442;
}

.form-control-has-error {
  box-shadow: none;
  border-color: #a94442;
  -webkit-box-shadow: 0 0 0 30px white inset;
}

.margin-bottom-x20 {
  margin-bottom: 20px;
}

.margin-top-x30 {
  margin-top: 30px;
}

.btn-secondary {
  border: 1px solid #dbdbdb;
  background: #fff;
  color: #363636;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
}
.btn-secondary:hover {
  border-color: #b5b5b5;
  background: rgba(242, 242, 242, 1);
  color: #363636;
}
.btn-secondary svg {
  margin-right: 10px;
}

.text-muted {
  color: #999;
}
</style>
