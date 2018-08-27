import axios from "axios";
import config from 'config';

export class apihelper {

    static fetchCities(query, callback) {       
        axios.get(`${config.apiUrl}/city/${query}`)
            .then(response => { 
                callback(null, response.data)
            })
            .catch(error => { 
                callback(error, null);
            });


    }

    


}           