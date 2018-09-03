<template >
  <div id="app"  dir="rtl">
   
    <nav-bar></nav-bar>
    <div class="container">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import  NavigationBar  from "./components/NavigationBar.vue";
export default {
  name: "app",
  components : {
    'nav-bar' :  NavigationBar
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
}
</style>
