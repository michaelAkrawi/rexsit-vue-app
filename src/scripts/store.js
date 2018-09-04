import { Login, LoginSuccsess, Logout, LoadProfileImage } from "./mutation-types.js";
import { getAuthUser } from './auth.js';
import { getFBProfilePicture } from './facebook.js'
import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isLoggedIn: getAuthUser() !== null,
        profileImageURL: ''
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        profileImageURL(state) {
            return this.profileImageURL;
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
        },
        [LoadProfileImage](state, user) {
            getFBProfilePicture(user.oAuthUniqueId).then(response => {
               state.profileImageURL = response.data.url;     
            }).catch(error => {
                console.log(error);
            })
        }

    },
    actions: {
        login(context, user) {
            context.commit(Login);
            return new Promise(resolve => {
                localStorage.setItem('user', JSON.stringify(user));
                context.commit(LoginSuccsess);
                context.commit(LoadProfileImage, user)
                resolve();
            })
        },
        logout(context) {
            localStorage.removeItem('user');
        },
        loadProfileImage(context, user) {
            getFBProfilePicture().then(response => {
                context.commit(LoadProfileImage, response.data.url);
            }).catch({

            })
        }
    }

})