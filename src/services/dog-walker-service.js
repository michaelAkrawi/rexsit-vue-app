import axios from "../../node_modules/axios";
import config from 'config';
import { authHeader } from '../scripts/auth.js';

export const dogWalkersService = {
    get,
    getDogWalkers,
    update,
    remove
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

function getDogWalkers(query) {
    return new Promise((resolve, reject) => {
        axios.get(`${config.apiURL}/DogWalkers/GetDogWalkers/${query.city}/${query.minRate}/${query.maxRate}`, { headers: authHeader() })
            .then(response => { resolve(response.data) })
            .catch(error => { reject(error) })

    });
}

function update(dogWalker) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.apiURL}/DogWalkers/Update`, JSON.stringify(dogWalker), { headers: authHeader() }, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => { resolve(response.data) })
            .catch(error => { reject(error); })
    })
}

function remove() {
    return new Promise((resolve, reject) => {
        axios.delete(`${config.apiURL}/DogWalkers/Delete`, { headers: authHeader() })
            .then(response => { resolve(response) })
            .catch(error => { reject(error) })
    })
}



