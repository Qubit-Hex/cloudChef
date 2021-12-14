/**
 * 
 *  Class: FetchServiceProvider
 *  
 * 
 *  purpose: inorder to fetch data from api in various ways and request types 
 *           -- note that this class is not meant to be used directly, but rather
 *         -- to be extended by other classes that need to fetch data from an api
 * 
 * 
 *  @author Oliver Shwaba  Qubit-hEx
 */




export default class FetchServiceProvider {

    constructor() {

    }


    /**
     * 
     *  @method: $post 
     * 
     *  @purpose: to fetch data from an api using a post request 
     *
     */

   $post(url, data, headers, callback) {

        let request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers
        });

        fetch(request)
            .then(response => {
                return response.json();
            })
            .then(data => {
                callback(data);
            })
            .catch(error => {
                console.log(error);
            });

    }

    /**
     * 
     *  @method: $get 
     * 
     *  @purpose: to fetch data from an api using a get request
     */

    $get(url, $data, headers, callback) {
            
            let request = new Request(url, {
                method: 'GET',
                headers: headers
            });
    
            fetch(request)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    callback(data);
                })
                .catch(error => {
                    console.log(error);
                });
    }





}