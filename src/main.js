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





import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/js/all.js'



const messages = require('./lang/localization.js').messages;
const errors = require('./lang/localization.js').errors;
var _ = require('lodash');

SimpleVueValidation.extendTemplates(errors.he);

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(BootstrapVue);
Vue.use(SimpleVueValidation);


const i18n = new VueI18n({
  locale: 'he',
  messages
})

const routes = [
  { path: '/', component: Home },
  { path: '/sign-up', component: SignUp },
  { path: '/login', component: Login },
  { path: '/profile/:fullName', component: Profile, props: true }

];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {

  const publicRoutes = ['/sign-up', '/login', '/'];
  const authRequired = !publicRoutes.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (!loggedIn && authRequired) {
    return next('/login')
  }

  next();

});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  i18n
}).$mount("#app")
  ;