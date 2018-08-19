<template>
    <div >
      <div class="row">
          <div class="col-6">                            
                <city-auto-complete class="location-text" ></city-auto-complete>
            </div>
            
          </div>            
          <div class="col-3">
              <b-dropdown id="ddown-services" :text=getServicesDropDownText()>
                    <dropdown-image-item fa-class="fas fa-paw"> {{$t("dogwallker")}} </dropdown-image-item>                    
                    <dropdown-image-item fa-class="fas fa-home"> {{$t("dogsitter")}} </dropdown-image-item>                     
               </b-dropdown>
          </div>
          <div class="col-3"></div>
      </div>
    </div>
</template>

<script>
import DropDownImageItemVue from "../components/DropDownImageItem.vue";
import CityAutoComplete from "../components/CityAutoComplete.vue";

export default {
  name: "search-bar",
  components: {
    "dropdown-image-item": DropDownImageItemVue,
    "city-auto-complete": CityAutoComplete
  },
  methods: {
    getServicesDropDownText() {
      return this.$t("services");
    }
  }
};
</script>

<style>
.dropdown-menu {
  right: 0px !important;
  text-align: right !important;
}

.row {
  text-align: right;
}

.location-text {
  width: 100%;
  height: 45px;

  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.city-search-container span {
  position: absolute;
  top: 15px;
  right: 24px;
  display: inline-block
}
</style>



