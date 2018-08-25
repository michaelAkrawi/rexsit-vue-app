import axios from "../../node_modules/axios";
import config from 'config';
import { authHeader } from '../scripts/auth.js';

export const userService = {
    register,
    login,
    get,
    getById,
    _delete

}

function login(username, password) {
    axios.post(`${config.apiDomain}/users/authenticate/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response));
            }

            return response;
        })
        .catch(error => {
            console.log(error);
        })
}

function register(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    axios.post(`${config.apiDomain}/users/register`, requestOptions)
        .then(function (response) {
            return response;
        })
        .catch(error => {
            console.log(error);
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