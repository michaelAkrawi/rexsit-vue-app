import axios from "axios";
export class apihelper {

    static fetchCities(query, callback) {       
        axios.get(`http://localhost:1942/api/city/${query}`)
            .then(response => { 
                callback(null, response.data)
            })
            .catch(error => { 
                callback(error, null);
            });


    }


}           