<template>
    <div class="wizard">        
        <wizard-progress :steps="steps"></wizard-progress>
        <div>
            <slot v-for="s in steps" :name="s.name" v-if="s.active"></slot>
        </div>
        <div class="wizard-step-bottom">   
           <button id="btn-next" @click="onNextClick" class="btn btn-primary" v-show="showNextButton">{{$t("saveAndContinue")}}</button>
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

.wizard-step-bottom {
  margin-top: 25px;
  overflow: hidden;
  text-align: center;
}


</style>

<script>
import WizardProgress from "../components/WizardProgress.vue";
import { User } from "../services/users-service";

export default {
  name: "wizard",
  props: {
    steps: {
      type: Array,
      default: () => {
        return [{}];
      }
    },
    onNextButtonClicked : undefined
  },
  computed: {
    showNextButton() {
      return this.getCurrentActiveStepIndex() < this.steps.length - 1;
    },
    showPrevButton() {
      return this.getCurrentActiveStepIndex() > 0;
    }
  },
  components: {
    "wizard-progress": WizardProgress
  },
  methods: {
    onNextClick() {
      const index = this.getCurrentActiveStepIndex();
      this.onNextButtonClicked(this.steps[index]);
      this.steps[index].active = false;
      this.steps[index + 1].active = true;
    },
    onPrevClick() {
      const index = this.getCurrentActiveStepIndex();
      this.steps[index].active = false;
      this.step[index].onNextCallbackFunction();
      this.steps[index - 1].active = true;
    },
    getCurrentActiveStepIndex() {
      const index = this.steps.findIndex(element => {
        return element.active == true;
      });

      return index;
    }
  }
};
</script>


