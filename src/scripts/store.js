import { Login, LoginSuccsess, Logout } from "./mutation-types.js";
import { getAuthUser } from './auth.js';
import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isLoggedIn: getAuthUser() !== null
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn;
        }
    },
    mutations: {
        [Login](state) {
            state.pending = true;
        },
        [LoginSuccsess](state) {
            state.isLoggedIn = true;
        },
        [Logout](state) {
            state.isLoggedIn = false;
        }
    },
    actions: {
        login(context, user) {
            context.commit(Login);
            return new Promise(resolve => {
                localStorage.setItem('user', JSON.stringify(user));
                context.commit(LoginSuccsess);
                resolve();
            })
        },
        logout(context) {
            localStorage.removeItem('user');
        }
    }

})