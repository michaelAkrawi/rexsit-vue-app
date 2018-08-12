<template >
  <div id="app" class="container" dir="rtl">
    <router-link v-bind:to="'/'">Home</router-link>
    <router-link v-bind:to="'/Signup'">Signup</router-link>
    <router-view></router-view>
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
</style>
