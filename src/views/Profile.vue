<template>
     <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-lg-7 col-md-auto">
            <wizard-vue :steps="steps" :on-next-button-clicked="onWizardNextStep">
                <wizard-step slot="details">
                    <profile-general-info ref="details" ></profile-general-info>
                  </wizard-step>
                  <wizard-step slot="dogs">                    
                    <profile-dog-info ref="dogs"></profile-dog-info>
                  </wizard-step>                    
                  <wizard-step slot="services">
                     <profile-services ref="services"></profile-services>
                  </wizard-step>
            </wizard-vue>
          </div>
        </div>
      </div>
</template>

<style scoped>
label {
  font-weight: 600;
}
.large-profile-image {
  width: 250px;
  height: 250px;
}
</style>



<script>
import Wizard from "../components/Wizard.vue";
import WizardStep from "../components/WizardStep.vue";
import ProfileGeneralInfo from "../components/ProfileGeneralInfo.vue";
import ProfileDogInfo from "../components/ProfileDogInfo.vue";
import ProfileServices from "../components/ProfileServices.vue";


export default {
  name: "app",
  components: {
    "wizard-vue": Wizard,
    "wizard-step": WizardStep,
    "profile-general-info": ProfileGeneralInfo,
    "profile-dog-info": ProfileDogInfo,
    "profile-services": ProfileServices
  },
  data: function() {
    return {
      steps: [
        {
          name: "details",
          icon: "fas fa-user",
          title: this.$t("details"),
          active: true
        },
        {
          name: "dogs",
          icon: "fas fa-paw",
          title: this.$t("dogs"),
          active: false
        },
        {
          name: "services",
          icon: "fas fa-hand-holding-usd",
          title: this.$t("servicesAndRates"),
          active: false
        }
      ]     
    };
  },
  methods: {
    onWizardNextStep(step) {
      return new Promise((resolve, reject) => {
        this.$refs[step.name].onStepCompleted().then(res => {
          if (res) resolve();
        });
      });
    }
  } 
};
</script>
