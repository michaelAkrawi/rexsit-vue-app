import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  


];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  el: '#app', 
  render: h => h(App),
  router  
}).$mount("#app")
