import config from 'config';
import axios from "../../node_modules/axios";

export function getGoogleStaticMap() {    
    return new Promise((resolve, reject) => {

        axios.get(`https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=10&size=300x300&language=iw&key=${config.mapsAppKey}`)
            .then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
    });
}

export function geolocation(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://eu1.locationiq.com/v1/search.php?key=${config.locationIQAppKey}&street=דניה 15&city=חיפה&country=ישראל&format=json`)
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
    });
}



