<template>
  <div>
    <div v-for="p in profiles" class="card card-search-profile">
      <div class="card-body">
        <div class="row">
          <div class="col-4 profile-image">
            <img :src="getProgileImage" >
          </div>
          <div class="col-6 profile-info">
            <h2 class="text-info">{{p.profile.firstName}} {{p.profile.lastName}}</h2>
            <p>{{p.profile.address}}, {{p.profile.city.name}}</p>
          </div>
          <div class="col-2">
            <div class="text-info rate-text">{{p.rate}} &#8362;</div>
            <p class="text-muted">{{$t("ratePerWalk")}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-profile",
  props: {
    profiles: Array
  }, 
  computed : {
    getProgileImage (){
      return this.$store.getters.profileImageURL;
    }
  }
};
</script>

<style>
.card-search-profile {
  cursor: pointer;
  border-right-color: #00d1b2;
  border-right-width: 0.25rem;
}

.rate-text {
  font-weight: 600;
  font-size: 22px;
}

.profile-info {
  font-weight: 600;
}
</style>

<style scoped>
.text-info {
  font-size: 22px;
  font-weight: 600;
}
</style>



