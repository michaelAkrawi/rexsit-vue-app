import axios from "../../node_modules/axios";
import config from 'config';
import { authHeader } from '../scripts/auth.js';

export const dogWalkersService = {
    get,
    update
}


function get() {
    return new Promise((resolve, reject) => {
        axios.get(`${config.apiURL}/DogWalkers/Get`, { headers: authHeader() })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })
    })
}

function update(dogWalker) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.apiURL}/DogWalkers/Update`, JSON.stringify(dogWalker), { headers: authHeader() }, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => { resolve(response.data) })
            .catch(error => {  reject(error); })
    })
}