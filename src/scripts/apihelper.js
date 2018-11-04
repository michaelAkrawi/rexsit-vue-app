import axios from "axios";
import config from 'config';

export class apihelper {

    static fetchCities(query, callback) {
        axios.get(`${config.apiURL}/city/${query}`)
            .then(response => {
                callback(null, response.data)
            })
            .catch(error => {
                callback(error, null);
            });
    }

    static fetchDogBreeds() {
        return new Promise((resolve, reject) => {
            axios.get(`${config.apiURL}/dogs/GetDogBreeds`).then(response => {
                resolve(response.data);
            }).catch(error => {              
                reject(error);
            })

        })
    }
}

    


       