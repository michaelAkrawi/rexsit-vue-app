<template>
    <div id="facebook-button" @click="signWithFacebook" >
                <span>  {{ buttonPrefix + ' ' +  $t("facebook") }} </span>
                <i class="fab fa-facebook"></i>
    </div>       
</template>

<script>
import {
  loadFbSdk,
  getFBLoginStatus,
  fbLogin,
  getFBProfilePicture,
  getFBInfo
} from "../scripts/facebook.js";

import { userService, User } from "../services/users-service.js";

export default {
  name: "facebook-login",
  props: ['buttonPrefix', 'callback'],
  data: function() {
    return {
      profileImageURL: ""
    };
  },

  methods: {
    signWithFacebook: function() {
      self = this;
      fbLogin().then(response => {
        if (response.status == "connected") {
          self.callback(response.authResponse);
        }
      });
    },
    register: function(userID) {
      getFBInfo(userID).then(response => {
        const u = self.getUserData(response);
        userService
          .register(u)
          .then(response => {
            console.log("connected");
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },

    getUserData: function(response) {
      return {
        firstName: response.first_name,
        lastName: response.last_name,
        email: response.email,
        oAuthProvider: "facebook",
        oAuthUniqueId: response.id
      };
    },
    setfbProfilePicture: function(userID) {
      getFBProfilePicture(userID)
        .then(response => {
          this.profileImageURL = response.data.url;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted: function() {
    loadFbSdk("211055006431121", "v3.1", function() {});
  }
};
</script>

<style>
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
</style>

