<template>
    <div class="wizard-progress-bar">                
        <div class="progress-bar-line"></div>        
            <div class="row">               
                <div v-for="step in steps" :class="['col-4 text-center', {'active': step.active}]">
                    <div class="progress-bar-step">
                        <i :class="step.icon"/>                                    
                    </div>
                    <p>{{step.title}} </p>
                </div>
            </div>                                      
        </div>
</template>

<script>
export default {
  name: "wizard-progress-bar",
  props: {
    steps: {
      type: Array,
      default: () => {
        return [{}];
      }
    }
  },
  computed: {
    isActiveStep(step) {
      return step.active;
    }
  }
};
</script>


<style scoped>
p {
  padding-right: 5px;
  margin-top: 10px;
  font-weight: 600;
}

.wizard-progress-bar {
  position: relative;
  margin: 10px 0px;
}

.progress-bar-line {
  background: #ddd;
  width: 100%;
  position: absolute;
  height: 1px;
  top: 25px;
}

.progress-bar-step {
  background-color: #ddd;
  color: #fff;
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border-radius: 50%;
  text-align: center;
  display: inline-block;
}

.active .progress-bar-step {
  background-color: #00d1b2;
}

.active p {
  color: #00d1b2;
}
</style>

