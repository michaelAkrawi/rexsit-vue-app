<template>
  <div class="card card-search-profile">
    <div class="card-body">
      <div class="row">
        <div class="col-4 profile-image"></div>
        <div class="col-6 profile-info">
          <h4 class="text-info"></h4>
          <p></p>
        </div>
        <div class="col-2">
          <div class="text-info rate-text">35</div>
          <p class="text-muted">תעריף להליכה</p>
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
  methods: {
    setupLayout() {
      this.profiles.forEach(element => {
        console.log(element);
      });
    }
  },
  watch: {
    profiles: function(newArray, oldArray) {
      if (newArray != undefined && newArray.length > 0) {
          this.setupLayout();
      }
    }
  },
  mounted() {
    this.setupLayout();
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
</style>


