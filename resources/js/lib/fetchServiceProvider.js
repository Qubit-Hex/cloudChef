/**
 *
 *  Class: FetchServiceProvider
 *
 *
 *  purpose: inorder to fetch data from api in various ways and request types
 *           -- note that this class is not meant to be used directly, but rather
 *         -- to be extended by other classes that need to fetch data from an api
 *         -- please note this is a helper class and prevent chaining helll :/
 *
 *  @author Oliver Shwaba  Qubit-hEx
 */




export default class FetchServiceProvider {



     /**
     *
     *  @method: getCookie
     *
     *
     * @purpose: this method is used to get the cookie from the browser
     */

      getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
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
     *   *            PLEASE NOTE THE CALLBACK IS WHATEVER YOU DESIRE TO DO WITH THE DATA
         *             SO IT GIVES YOU CONTROL IMPLIMENT YOUR PROBLEM RATHER THAN WORRYING ABOUT
         *             FETCH REQUESTS IN YOUR MAIN CODE :)
     */

    $get(url, headers, callback) {

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

    /**
     *
     * @method: get
     *
     * @purpose: to fetch data from an api using a get request and return the data no callback
     *
     */

    async get(url, headers) {

                let request = new Request(url, {
                    method: 'GET',
                    headers: headers
                });

                return fetch(request)
                    .then(response => {
                        return new Promise((resolve, reject) => {
                            response.json().then(data => {
                                resolve(data);
                            });
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });

        }

    /**
     *
     *  @method: post
     *
     *  @purpose: to fetch data from an api using a post request and return the data no callback
     *
     */

    async post(url, data, headers) {
        let request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers
        });

        return fetch(request)
            .then(response => {
                return new Promise((resolve, reject) => {
                    response.json().then(data => {
                        resolve(data);
                    });
                });
            }).catch(error => {
                console.log(error);
            });
    }

    /**
     *
     *  @method: upload
     *
     *  @purpose: to upload a file to an api using a post request
     *
     */

    async upload(url, data, headers) {
        let request = new Request(url, {
            method: 'POST',
            body: data,
            headers: headers
        });

        return fetch(request)
            .then(response => {
                return new Promise((resolve, reject) => {
                    response.json().then(data => {
                        resolve(data);
                    });
                });
            }).catch(error => {
                console.log(error);
            });
    }

    /**
     *
     *  @method patch
     *
     *
     *  @purpose: to preform a  update to the api using a patch request
     *
     */
    async patch(url, data, headers) {
        
        let request = new Request(url, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: headers
        });

        return fetch(request)
            .then(response => {
                return new Promise((resolve, reject) => {
                    response.json().then(data => {
                        resolve(data);
                    });
                });
            }).catch(error => {
                console.log(error);
            });
    }
}
