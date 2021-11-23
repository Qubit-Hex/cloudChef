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
     *  @method: getData 
     * 
     *  @purpose: to fetch data from an api
     *
     *  @param: url - the url of the api 
     *  @param: requestType - the type of request to be made
     *  @param: data - the data to be sent to the api
     *  @param: headers - the headers to be sent to the api
     * @param: callback - the callback function to be called when the data is fetched
     *
     * @returns: void
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





}