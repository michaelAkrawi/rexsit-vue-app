import axios from "../../node_modules/axios";
import config from 'config';
import { authHeader, getAuthUser } from '../scripts/auth.js';


export const userService = {
    register,
    login,
    get,
    refresh,
    updatePersonalInfo,
    resetPassword
}

const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}

export const User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    oAuthProvider: '',
    oAuthUniqueId: undefined
}


function login(user) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.apiURL}/authentication/user/login`, JSON.stringify(user), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            })
    });
}

function register(user) {

    return new Promise((resolve, reject) => {
        axios.post(`${config.apiURL}/authentication/user/register`, JSON.stringify(user), requestOptions)
            .then(function (response) {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            })
    })
}



function get() {
    return new Promise((resolve, reject) => {
        axios.get(`${config.apiURL}/user/get`, {
            headers: authHeader()
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        })
    })
}

async function refresh() {
    const user = getAuthUser();
    return new Promise((resolve, reject) => {
        axios.post(`${config.apiURL}/authentication/user/refresh`, JSON.stringify(user), requestOptions)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            })
    })
}

function updatePersonalInfo(profileInfo) {
    return new Promise((resolve, reject) => {
        axios.put(`${config.apiURL}/user/PutPersonlInfo`, JSON.stringify(profileInfo), { headers: authHeader() })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            })
    })
}

function resetPassword(email) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.apiURL}/authentication/user/resetpassword?email=${email}`, null, requestOptions)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            })
    })
}

