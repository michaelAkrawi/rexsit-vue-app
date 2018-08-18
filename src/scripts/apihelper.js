
export class apihelper {

    static fetchCities (query, callback) {
        
        debugger;
        const data = {
            q : query,
            resource_id : 'd4901968-dad3-4845-a9b0-a57d027f11ab',
            limit: 10
        }

        fetch('https://data.gov.il/api/action/datastore_search', {
            method : 'POST',
            body : JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
              }
        }).then(function(response){
            response.json().then(function(data){
                callback(null, data);
            })
        }).catch(function(error){
            callback(error, null);
        })
    }

}           