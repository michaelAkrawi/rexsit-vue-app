<template>
     <div>
        <div class="wizard-step-title">
            <i :class="icon"></i>
        </div>
        <p>
            {{title}}
        </p>
        <div class="wizard-step-content">
            <slot></slot>
        </div>     
     </div>
</template>

<style scoped>
.wizard-step-title {
  padding: 10px;
  color: #333;
  cursor: pointer;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  border: 3px solid #F3F2EE;
  text-align: center;
  position: relative;
  display: inline-block;
}

p {
display: inline-block;
}

.wizard-step-title i {
    margin-left:  5px;
    color: #333;
    font-size: 20px;
    position: absolute;
}
</style>

<script>
export default {
  name: "wizard-step",
  props: ["title", "icon"]
};
</script>


