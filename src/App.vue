<template >
  <div id="app"  dir="rtl">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
       <a class="navbar-brand" href="#">Rexsit</a>
   
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
   
    <div class="collapse navbar-collapse navbar-left" id="navbarNav">
      <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link id="btn-sign-up" v-bind:to="'/Signup'">{{$t("signup.register")}}</router-link>
      </li>
      </ul>
    </div>
    </nav>
    <div class="container">
        <router-view></router-view>
    </div>
<p>

    
    </p>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
body {
  background-color: #f7f7f7;
  color: #333;
  font-size: 14px;
}

.btn-primary {
  background-color: #00d1b2;
  color: fff;
  border-color: transparent;
}

.btn-primary:hover {
  background-color: #00c4a7;
  border-color: transparent;
}

#btn-sign-up {
  text-decoration: none;
  color: #333 !important;
  font-weight: 600;
  font-size: 16px;
}

.navbar-left {
  float: left;
  margin-left: 15px;
  direction: ltr;
}
</style>
