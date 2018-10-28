import axios from "../../node_modules/axios";
import config from 'config';
import { authHeader } from '../scripts/auth.js';



export const dogOwnerService = {
    updateDogInfo,
    getDogInfo
}

function updateDogInfo(dogOwner) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.apiURL}/dog/UpdateDogs`, JSON.stringify(dogOwner), { headers: authHeader() })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })
    })
}

function getDogInfo() {
    return new Promise((resolve, reject) => {
        axios.get(`${config.apiURL}/dog/GetDogOwner`, { headers : authHeader() })
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
    })
}