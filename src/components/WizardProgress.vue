<template>
    <div>
        <div class="progress"></div>        
        <div v-for="step in steps" class="step">
            <div>
                <i :class="step.icon"/>
            </div>
            <p>
                {{step.name}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
  name: "wizard-progress-bar",
  props: {
    steps: {
      name: "",
      icon: ""
    }
  }
};
</script>


<style scoped>
.active {
  background-color: #00d1b2;
}

.progress {
  background: #ddd;
  width: 100%;
  position: absolute;
  height: 1px;
}

.step {
  display: inline-block;
}
</style>

