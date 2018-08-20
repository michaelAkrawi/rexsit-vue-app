<template>
    <div >
      <div class="row">
            <div class="col-6 search-bar-col city-search-container">                            
                <span>
                    <i class="fas fa-map-marker-alt"></i>
                </span>
                <city-auto-complete></city-auto-complete>
            </div>                               
            <div class="col-2 search-bar-col search-bar-col-button">
                <b-dropdown id="ddown-services" :text=getServicesDropDownText()>
                    <dropdown-image-item fa-class="fas fa-paw"> {{$t("dogwallker")}} </dropdown-image-item>                    
                    <dropdown-image-item fa-class="fas fa-home"> {{$t("dogsitter")}} </dropdown-image-item>                     
                </b-dropdown>
            </div>
            <div class="col-2 search-bar-col">

            </div>
            <div class="col-2 search-bar-col search-bar-col-button">
                <button id="btn-search" class="btn-primary"> {{$t("search")}} </button>
            </div>
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

.row {
  text-align: right;
}

.search-bar-col {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-width: 1px 0 1px 1px;
  padding: 10px;
}

.search-bar-col-button {
  padding: 0;
}
.city-search-container input[type="text"] {
  width: 100%;
  height: 28px;
  border-color: transparent;
  outline: none;
  font-size: 18px;
  padding-right: 35px;
}

#ddown-services{
    width: 100%;
    height: 100%;
}

#ddown-services button{
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    color : #333;
}

#ddown-services button:after{
    position: absolute;
    top: 22px;
    left: 10px;
}

.city-search-container span {
  position: absolute;
  top: 15px;
  right: 24px;
  display: inline-block;
}

#btn-search {
  height: 100%;
  width: 100%;
  font-weight: 500;
  font-size: 20px;
}
</style>



