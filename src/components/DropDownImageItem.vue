<template>
    <div class="dropdown-item-container">
        
        <b-dropdown-item> 
            <i v-bind:class="faClass"></i>    
            <slot></slot> 
            </b-dropdown-item>
    </div>
</template>

<script>
export default {
  name: "dropdownn-image-item",
  props: ["faClass"]
};
</script>

<style>
.dropdown-item-container {
  position: relative;
  width: 100%;
}

.dropdown-item-container svg {
  position: absolute;
  left: 10px;
  top: 5px;
  color: #333;
  font-size: 22px;
}

.dropdown-item{
    color: #425864
}
.dropdown-item:hover, 
.dropdown-item:focus,
.dropdown-item:hover svg,
.dropdown-item:focus svg

{
  color: #fff;
  background-color: #00d1b2;
  
}


</style>


