<template>
    <div class="wizard">
        <slot></slot>
    </div> 
</template>

<style scoped>
 .wizard {
    background:  #fff;
    width: 100%;
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


