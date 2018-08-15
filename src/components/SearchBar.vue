<template>
    <div >
      <div class="row">
          <div class="col-6">                
            <input type="text" />
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

export default {
  name: "search-bar",
  components: { 
      "dropdown-image-item": DropDownImageItemVue 
      },
      methods:{
          getServicesDropDownText () {
              return this.$t("services")
          }
      }
};
</script>

<style>
.dropdown-menu{
    right: 0px !important;
    text-align: right !important;
}
</style>



