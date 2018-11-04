import axios from "../../node_modules/axios";
import config from 'config';
import { authHeader } from '../scripts/auth.js';

export const dogSitterService = {
    get,
    update
}

function get() {
    return new Promise((resolve, reject) => {
        axios.get(`${config.apiURL}/DogSitters/Get`, { headers: authHeader() })
            .then(response => { resolve(response.data) })
            .catch(error => { reject(error) })
    })
}

function update(dogSitter) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.apiURL}/DogSitters/Update`, JSON.stringify(dogSitter), { headers: authHeader() })
            .then(response => { resolve(response.data) })
            .catch(error => { reject(error)})
    })
}