import axios from "../../node_modules/axios";
import config from 'config';
import { authHeader } from '../scripts/auth.js';

export const userService = {
    register,
    login,
    getById,
    _delete

}

export const User = {
    firstName: '',
    lastName: '',
    email: '',
    passwordText: '',
    oAuthProvider :'',
    oAuthUniqueId : undefined
}

function login(user) {    
    return new Promise((resolve, reject)=> {
        axios.post(`${config.apiURL}/authentication/user/login`, JSON.stringify(user), {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        .then( response =>{
            resolve(response);
        })
        .catch(error =>{
            reject(error);
        })
    });        
}

function register(user) {
    
    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

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
    axios.get(`${config.apiDomain}/users/${id}`, {
        headers: authHeader()
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })
}

function _delete() {

}