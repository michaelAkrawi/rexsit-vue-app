<template>
<div>
   <search-bar></search-bar>
   
</div>

</template>

<script>


import SearchBar from '../components/SearchBar.vue'

export default {
    name : 'app', 
    components : {
        "search-bar" : SearchBar
    }
}


</script>

