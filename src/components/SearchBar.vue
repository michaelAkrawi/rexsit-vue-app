<template>
    <div class="container" >            
            <div class="row">
              <div class="col-sm-6 search-bar-col">                                            
                <city-auto-complete></city-auto-complete>
              </div>                               
              <div class="col-sm-2 search-bar-col search-bar-col-button">
                <vue-select dir="rtl" :options="services" label="label" :searchable=false>
                    <template slot="option" slot-scope="option">
                        <span >
                            <i :class="option.icon"></i>
                            {{option.label}}
                        </span>
                    </template>
                </vue-select>
              </div>
              <div class="col-sm-2 search-bar-col date-picker-col">
                <date-picker format="dd-MM-yyyy" :language="he" placeholder="תאריך" :clear-button=true :calendar-button=true calendar-button-icon="fas fa-calendar"
                 wrapper-class="date-picker-wrapper" calendar-class="date-picker-calendar" ></date-picker>
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
import Datepicker from "vuejs-datepicker";
import vSelect from "vue-select";
import { he } from "vuejs-datepicker/dist/locale";

export default {
  name: "search-bar",
  components: {
    "dropdown-image-item": DropDownImageItemVue,
    "city-auto-complete": CityAutoComplete,
    "date-picker": Datepicker,
    "vue-select": vSelect
  },
  data: function() {
    return {
      services: [
        { label: this.$t("dogwallker"), value: 1, icon: "fas fa-paw" },
        { label: this.$t("dogsitter"), value: 2, icon: "fas fa-home" }
      ],
      he: he      
    };
  },
  mounted: function() {
    this.service = this.$t("services");
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
  font-size: 16px;
  padding-right: 35px;
}

.v-select .dropdown-toggle {
  border: none;
}

.v-select.rtl .open-indicator {
  top: 15px;
}

.v-select.unsearchable input[type=search]{
  display: none;
}

.v-select.rtl .dropdown-toggle .clear{
  top: 11px;
}
.v-select .dropdown-menu{
  top: 50px;
  overflow: hidden;
}

.v-select .dropdown-menu>.highlight>a{
  background-color: #00d1b2;
  color: #fff;
}

.v-select .selected-tag{
  padding: 7px;
  font-size: 16px;
}

.date-picker-wrapper {
  position: relative;
}

.vdp-datepicker__calendar-button {
  position: absolute;
}

.date-picker-col input[type="text"] {
  border: transparent !important;
  font-size: 16px;
  width: 90%;
  padding-right: 15px;
}

.date-picker-calendar {
  top: 38px;
  right: -11px;
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



