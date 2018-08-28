import axios from "../../node_modules/axios";
import config from 'config';
import { authHeader } from '../scripts/auth.js';

export const userService = {
    register,
    login,
    getById,
    _delete

}

export class User {
    constructor(firsName, lastName, email, password) {
        this.firsName = firsName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

function login(username, password) {
    axios.post(`${config.apiURL}/authentication/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }).then(response => {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response));
        }
        return response;
    }).catch(error => {
        console.log(error);
    })
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
                console.log(error);
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