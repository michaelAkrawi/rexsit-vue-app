<template>
  <div class="row mt-1">
    <div class="col-2">
      <div class="sidebar-filters">
        <search-filters :service="this.$route.query.service" :city="this.$route.query.city"></search-filters>
      </div>
    </div>
    <div class="col-6">
      <div class="search-results-container">
        <search-profile :profiles="searchResults"></search-profile>
      </div>
    </div>
    <div class="col-4">
      <div class="map"></div>
    </div>
  </div>
</template>

<script>
import SearchFilters from "../components/SearchFilters.vue";
import SearchProfile from "../components/SearchProfile.vue";
import { dogWalkersService } from "../services/dog-walker-service.js";

export default {
  name: "search",
  components: {
    "search-filters": SearchFilters,
    "search-profile": SearchProfile
  },
  data() {
    return {
        searchResults : []
    };
  },
  methods: {
    performSearch() {
      if (this.$route.query.service == "dogwalker") this.fetchDogWalkers();
      else if (this.$route.query.service == "dogsitter") this.fetchDogSitters();
    },
    fetchDogWalkers() {
      let query = { city: this.$route.query.city, minRate: 25, maxRate: 150 };
      dogWalkersService
        .getDogWalkers(query)
        .then(response => {
          this.searchResults = response;
        })
        .catch(error => {
            console.log(error);
        });
    },
    fetchDogSitters() {}
  },
  mounted() {
    this.performSearch();
  }
};
</script>

