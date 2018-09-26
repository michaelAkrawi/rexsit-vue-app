import axios from "../../node_modules/axios";
import config from 'config';
import { authHeader, getAuthUser } from '../scripts/auth.js';


export const userService = {
    register,
    login,
    getById,
    refresh
}

const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}

export const User = {
    firstName: '',
    lastName: '',
    email: '',
    passwordText: '',
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



function getById(id) {
    return new Promise((resolve, reject) => {

        axios.get(`${config.apiURL}/user/${id}`, {
            headers: authHeader()
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        })
    })
}

function refresh() {    
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

