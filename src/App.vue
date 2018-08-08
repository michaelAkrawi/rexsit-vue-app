<template>
  <div id="app">
    <router-link v-bind:to="'/'">Home</router-link>
    <router-link v-bind:to="'/'">About</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
 
  }

</script>

<style>
</style>
