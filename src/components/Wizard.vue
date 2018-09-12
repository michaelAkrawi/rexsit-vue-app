<template>
    <div class="wizard">        
        <slot v-for="s in steps" :name="s"></slot>
    </div> 
</template>

<style scoped>
 .wizard {
    background:  #fff;
    width: 100%;
    padding: 15px;
    height: 100%;
 }
</style>

<script>
export default {
    name : 'wizard',
    props : {
       steps : []
    },
    data : {

    }
}
</script>


