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
        <div class="wizrd-step-bottom">   
           <button id="btn-next" class="btn btn-primary">{{$t("next")}}</button>
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
  border: 3px solid #f3f2ee;
  text-align: center;
  position: relative;
  display: inline-block;
}

p {
  display: inline-block;
}

.wizard-step-title i {
  margin-left: 5px;
  color: #333;
  font-size: 20px;
  position: absolute;
}

.wizrd-step-bottom {
  margin-top: 25px;  
  overflow: hidden;

}

.wizrd-step-bottom #btn-next{
  float: left;
  
 
}    
</style>

<script>
export default {
  name: "wizard-step",
  props: ["title", "icon"]
};
</script>


