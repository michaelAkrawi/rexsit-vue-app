import { Login, LoginSuccsess, Logout, LoadProfileImage } from "./mutation-types.js";
import { getAuthUser } from './auth.js';
import { getFBProfilePicture } from './facebook.js'
import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isLoggedIn: getAuthUser() !== null,
        profileImageURL: getAuthUser() !== null ? getAuthUser().profileImageURL : ''
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        profileImageURL(state) {
            return state.profileImageURL;
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
        [LoadProfileImage](state, url) {
            state.profileImageURL = url;
        }

    },
    actions: {
        async login({ dispatch, commit }, user) {            
            commit(Login);
            await dispatch('loadProfileImage', user);
            debugger;
            return new Promise(resolve => {
                commit(LoginSuccsess);
                localStorage.setItem('user', JSON.stringify(user));
                resolve();
            })
        },
        logout(context) {
            localStorage.removeItem('user');
        },
        loadProfileImage(context, user) {
            return new Promise((resolve => {
                getFBProfilePicture(user.oAuthUniqueId).then(response =>{
                    context.commit(LoadProfileImage, response.data.url);
                    user.profileImageURL = response.data.url;
                    debugger;
                    resolve();
                });
                
            }))
        }
    }

})