import axios from "axios";
import config from 'config';
import { authHeader } from '../scripts/auth.js';

export const dogSitterService = {
    get,
    update,
    remove
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
            .catch(error => { reject(error) })
    })
}

function remove() {
  
    return new Promise((resolve, reject) => {
        axios.delete(`${config.apiURL}/DogSitters/Delete`, { headers: authHeader() })
            .then(response => { resolve(response) })
            .catch(error => { reject(error) })
    });
}

