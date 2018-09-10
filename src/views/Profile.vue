<template>
     <div>
     <wizard>
       <wizard-step title="פרטים" icon="fas fa-user">
         <form>
           <div class="form-group">
             <label for="txb-first-name"> שם פרטי </label>
             <input type="text" id="txb-first-name" class="form-control" />
           </div>
           <div class="form-group">
             <label for="txb-last-name">שם משפחה </label>
             <input type="text" id="txb-last-name" class="form-control"/>
           </div>
           <div class="form-group">
             <label for="txb-city">עיר</label>
             <city-autocomplete id="txb-city" class="form-control"></city-autocomplete>
           </div>
            <div class="form-group">
              <label for="txb-address">כתובת </label>
              <input type="text" id="txv-address" class="form-control" />
           </div>
         </form>
       </wizard-step>
     </wizard>
     </div>
</template>

<style scoped>

</style>



<script>

import Wizard  from "../components/Wizard.vue";
import WizardStep from '../components/WizardStep.vue'
import CityAutoComplete from '../components/CityAutoComplete.vue'

export default {
  name: "app",
  props: ["fullName"],
  components : {
    'wizard' : Wizard,
    'wizard-step' : WizardStep,
    'city-autocomplete' :  CityAutoComplete
  }
};
</script>
