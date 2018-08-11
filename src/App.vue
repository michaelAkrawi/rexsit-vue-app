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
  name: 'app'
 
  }

</script>

<style>
</style>
