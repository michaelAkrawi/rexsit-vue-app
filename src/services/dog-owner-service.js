import axios from "../../node_modules/axios";
import config from 'config';
import { authHeader } from '../scripts/auth.js';



export const dogOwnerService = {
    updateDogInfo,
    getDogInfo
}


function getDogInfo() {
    return new Promise((resolve, reject) => {
        axios.get(`${config.apiURL}/dogs/GetDogOwner`, { headers: authHeader() })
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
    })
}

function updateDogInfo(dogOwner) {    
    return new Promise((resolve, reject) => {
        axios.post(`${config.apiURL}/dogs/UpdateDogs`, JSON.stringify(dogOwner), { headers: authHeader() }, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {          
            resolve(response.data);
        }).catch(error => {            
            reject(error);
        })
    })
}