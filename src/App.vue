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

Axios.create({
  transformRequest: [data => (isString(data) ? data : qs.stringify(data))]
});

Axios.interceptors.response.use(null, error => {
  if (error.config && error.response && error.response.status === 401) {
    return getRefreshedToken().then(response => {
      debugger;
      store.dispatch("refresh", response.data).then(response => {
        debugger;
        error.config.headers = authHeader();
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
  mounted() {
    loadFbSdk(config.facebookAppID, "v3.1", function() {});
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
</style>
