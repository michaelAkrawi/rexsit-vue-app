import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import SignUp from './views/Signup.vue'
import Profile from './views/Profile.vue'

import VueI18n from 'vue-i18n'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const messages = require('./lang/localization.js').default;


Vue.use(VueRouter)
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'he',
  messages
})

const routes = [
  { path: '/', component: Home },
  { path: '/SignUp', component: SignUp },
  { path: '/profile/:id', component: Profile, props : true }

];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  i18n
}).$mount("#app")
