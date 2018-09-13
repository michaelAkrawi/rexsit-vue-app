<template>
     <div>        
        <div class="wizard-step-content">
            <slot></slot>
        </div>  
        <div class="wizard-step-bottom">   
           <button id="btn-next" @click="onNextClick" class="btn btn-primary">{{$t("next")}}</button>
        </div>
     </div>
</template>

<style scoped>

.wizard-step-bottom {
  margin-top: 25px;  
  overflow: hidden;

}

.wizard-step-bottom #btn-next{
  float: left;
  
 
}    
</style>

<script>
export default {
  name: "wizard-step",
  props: ['onNextCallback'],
  methods :{
      onNextClick(){
          if(onNextCallback!== undefined){
              onNextCallback();
          }
      }
  }
};
</script>


