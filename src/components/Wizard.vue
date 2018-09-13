<template>
    <div class="wizard">        
        <wizard-progress :steps="steps"></wizard-progress>
        <div class="step">
            <slot v-for="s in steps" :name="s.name" v-if="s.active"></slot>
        </div>
    </div> 
</template>

<style scoped>
.wizard {
  background: #fff;
  width: 100%;
  padding: 15px;
  height: 100%;
}
</style>

<script>
import WizardProgress from "../components/WizardProgress.vue";

export default {
  name: "wizard",
  props: {
    steps: []
  },
  components: {
    "wizard-progress": WizardProgress
  }  
};
</script>


