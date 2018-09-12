import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import SignUp from './views/Signup.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import SimpleVueValidation from 'simple-vue-validator';
import Vuex from 'vuex';





import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/js/all.js'



import { store } from './scripts/store.js';
const messages = require('./lang/localization.js').messages;
const errors = require('./lang/localization.js').errors;
var _ = require('lodash');

SimpleVueValidation.extendTemplates(errors.he);

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(BootstrapVue);
Vue.use(SimpleVueValidation);
Vue.use(Vuex);


const i18n = new VueI18n({
  locale: 'he',
  messages
});

const routes = [
  { path: '/', component: Home },
  { path: '/signup', component: SignUp },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile }

];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {

  const publicRoutes = ['/signup', '/login', '/'];
  const authRequired = !publicRoutes.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (!loggedIn && authRequired) {
    return next('/login')
  }
  if ((to.path == '/login' || to.path == '/signup') && loggedIn) {
    return next('/');
  }

  next();

});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  i18n,
  store
}).$mount("#app")