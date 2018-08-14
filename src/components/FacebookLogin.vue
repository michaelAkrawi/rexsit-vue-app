<template>
    <div id="facebook-button" @click="signWithFacebook">
                <span>  {{ buttonPrefix + ' ' +  $t("signup.facebook") }} </span>
                <i class="fab fa-facebook"></i>
    </div>       
</template>

<script>
import {
  loadFbSdk,
  getFBLoginStatus,
  fbLogin,
  getFBProfilePicture
} from "../scripts/facebook.js";

export default {
  name: "facebook-login",
  props: ["buttonPrefix"],
  data: function() {
    return {
      profileImageURL: ""
    };
  },
  methods: {
    signWithFacebook: function() {
      getFBLoginStatus(response => {
        if (response.status == "not_authorized") {
          fbLogin().then(response => {
            if (response.status == "connected") {
              setfbProfilePicture(response.userID);
            } else {
              console.log("user cancelled facebook login");
            }
          });
        } else if (response.status == "unknown") {
        } else if (response.status == "connected") {
          this.setfbProfilePicture(response.authResponse.userID);
          this.$router.push({ path: "/profile/123" });
        }
      });
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

