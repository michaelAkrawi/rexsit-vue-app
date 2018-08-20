<template>
    <div >
      <div class="row">
            <div class="col-sm-6 search-bar-col">                                            
                <city-auto-complete></city-auto-complete>
            </div>                               
            <div class="col-sm-2 search-bar-col search-bar-col-button">
                <b-dropdown id="ddown-services" :text=getServicesDropDownText()>
                    <dropdown-image-item v-for="s in services" :fa-class="s.fa" @click="setSelectedService()"> {{s.text}} </dropdown-image-item>                                        
                </b-dropdown>
            </div>
            <div class="col-sm-2 search-bar-col">

            </div>
            <div class="col-sm-2 search-bar-col search-bar-col-button">
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
  data: function() {
    return {
      services: [
        { text: this.$t("dogwallker"), fa: "fas fa-paw" },
        { text: this.$t("dogsitter"), fa: "fas fa-home" }
      ]
    };
  },
  methods: {
    getServicesDropDownText() {
      return this.$t("services");
    },

    setSelectedService: function() {
        window.alert('');
    }
  },

  computed: {}
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

#ddown-services {
  width: 100%;
  height: 100%;
}

#ddown-services button {
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  color: #333;
}

#ddown-services button:after {
  position: absolute;
  top: 22px;
  left: 10px;
}



#btn-search {
  height: 100%;
  width: 100%;
  font-weight: 500;
  font-size: 20px;
}

.dropdown-menu {
  right: 0px !important;
  text-align: right;
}
</style>



