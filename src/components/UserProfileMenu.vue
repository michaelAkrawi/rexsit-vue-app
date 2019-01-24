<template>
  <div>
    <div id="user-profile-menu">
      <div @click="toggle">
        <img :src="getProfileImageURL" class="profile-image">
      </div>
      <ul id="profile-menu-items" role="menu" v-show="visible">
        <li>
          <i class="far fa-user"></i>
          <router-link v-bind:to="'/profile'">{{$t("profile")}}</router-link>
        </li>
        <li>
          <i class="far fa-envelope"></i>
          <router-link v-bind:to="'/inbox'">{{$t("inbox")}}</router-link>
        </li>
        <li>
          <i class="fas fa-power-off"></i>
          <a @click="logout">{{$t("logout")}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-profile-menu",
  computed: {
    getProfileImageURL() {
      return this.$store.getters.profileImageURL;
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    logout() {
      this.$store.dispatch("logout").then(resolve => {});
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style scoped>
#user-profile-menu {
  display: inline-block;
  position: relative;
  padding: 10px;
}

#user-profile-menu > div {
  cursor: pointer;
}

.profile-image {
  width: 30px;
  border-radius: 100%;
}

#profile-menu-items {
  background-color: #fff;
  border: 1px solid #d9dee4;
  position: absolute;
  list-style-type: none;
  left: 0;
  padding: 10px 0px;
  min-width: 150px;
  top: 100%;
  z-index: 2;
}

#profile-menu-items::after {
  border-bottom: 6px solid #fff;
  border-left: 6px solid rgba(0, 0, 0, 0);
  border-right: 6px solid rgba(0, 0, 0, 0);
  content: "";
  display: inline-block;
  position: absolute;
  top: -6px;
  left: 16px;
}

#profile-menu-items > li {
  position: relative;
}

#profile-menu-items > li > svg {
  position: absolute;
  right: 10px;
  top: 12px;
}

#profile-menu-items > li > a {
  display: block;
  color: #333;
  white-space: nowrap;
  padding: 8px 10px;
  text-align: right;
  text-decoration: none;
  margin: 5px 30px 5px 5px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
}

#profile-menu-items > li:hover {
  background-color: #f5f5f5;
}
</style>


