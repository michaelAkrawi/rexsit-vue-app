import { Login, LoginSuccsess, Logout, LoadProfileImage, RefreshUserToken, FacebookSDKLoad } from "./mutation-types.js";
import { getAuthUser } from './auth.js';
import { getFBProfilePicture } from './facebook.js'
import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isLoggedIn: getAuthUser() !== null,
        profileImageURL: getAuthUser() !== null ? getAuthUser().profileImageURL : '',
        facebookSKDLoaded : false
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        profileImageURL(state) {
            return state.profileImageURL;
        },
        isFacebooKSDKLoaded (state){
            return state.facebookSKDLoaded;
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
        },
        [RefreshUserToken](state) {
            state.isLoggedIn = true;
        },
        [FacebookSDKLoad](state){
            state.facebookSKDLoaded = true;
        }

    },
    actions: {
        async login({ dispatch, commit }, user) {
            commit(Login);
            await dispatch('loadProfileImage', user);
            return new Promise(resolve => {
                commit(LoginSuccsess);
                localStorage.setItem('user', JSON.stringify(user));
                resolve();
            })
        },
        logout(context) {
            context.commit(Logout);
            localStorage.removeItem('user');
        },
        loadProfileImage(context, user) {

            return new Promise((resolve => {
                if (user.oAuthUniqueId !== null) {
                    getFBProfilePicture(user.oAuthUniqueId).then(response => {
                        context.commit(LoadProfileImage, response.data.url);
                        user.profileImageURL = response.data.url;
                        resolve();
                    });
                }
                else {

                }
            }))
        },
        async refresh({ dispatch, commit }, user) {
            commit(RefreshUserToken);
            await dispatch('loadProfileImage', user);
            return new Promise(resolve => {
                localStorage.setItem('user', JSON.stringify(user));
                resolve();
            })
        },
        loadFBSDK(context){
            context.commit(FacebookSDKLoad);
        }

    }


})