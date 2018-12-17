<template>
<div class="hero-container">
   <div class="hero-overlay-opaque"></div>
   <div class="hero-content">
        <div class="container">
            <search-bar></search-bar>   
        </div>
   </div>
</div>

</template>

<script>
import SearchBar from "../components/SearchBar.vue";

export default {
  name: "app",
  components: {
    "search-bar": SearchBar
  }
};
</script>


<style scoped>
header .navbar {
  border: none;
  background: transparent;
  box-shadow: none;
}

.hero-container {
  background-image: url("../assets/hero_dog_blur.jpg");
  height: 500px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  margin-top: -80px;
  padding-top: 210px;
  min-height: 774px;
}


</style>



