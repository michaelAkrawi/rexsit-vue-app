<template>
<div>
   <search-bar></search-bar>
   
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
header {
  background-image: url("../assets/hero_dog_blur.jpg");
  height: 500px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 35% 75%;
}

header .navbar {
  border: none;
  background: transparent;
  box-shadow: none;
}

</style>



