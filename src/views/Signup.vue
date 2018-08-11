<template>
    <div class="sign-container">
       <div class="sign-header">
         הרשמה
       </div>
       <div class="sign-body">
           <button class="btn btn-primary"> {{ $t("signup.facebook") }} </button>
       </div>
       <hr>
       <div>
        <input type="text" id="txb-username">
       </div>
        <div>
            <input type="text" id="txb-password">
        </div>
    </div>
</template>

<script>
export default {
    name : 'app'
}
</script>



<style>
  .sign-container{
   text-align:center;
   font-weight: 600;

  }
</style>
