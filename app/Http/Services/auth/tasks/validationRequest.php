<?php


/**
 * 
 *  @class: validationRequest
 * 
 *  purpose: inorder to validate the request before sending it to our authentication service
 *           
 * 
 */



namespace App\Http\Services\auth\tasks;



use Illuminate\Support\Facades\DB;

class validationRequest {


    public function __construct() {

        $this->maxBruteForceAttempts = 15;

    }

    /**
     *  @method: createRequestToken()
     * 
     *  @purpose: inorder to create a request token for each page they enter
     * 
     *  @return: returns a token
     */
    public function createRequestToken($requestNumber) {
            
        return hash('whirlpool', $requestNumber);
    }

    /**
     *  @method: sanitizeRequest
     * 
     *  @purpose: inorder to sanitize the request before sending it to the server
     * 
     * 
     *  @return:  filtered array of the request
     */

     public function sanitizeRequest($input) {

        return filter_var_array($input, FILTER_SANITIZE_STRING);
     }

    /**
     * 
     *  @method: validateEmail
     * 
     * 
     *  @purpose: inorder to validate the email address
     * 
     * 
     *  @return:  returns true if the email address is valid and false if it is not
     */


    public function email($email) {

        return !empty($email) ? filter_var($email, FILTER_VALIDATE_EMAIL) : false;
    }

    /**
     *  
     *  @method: validatePassword
     * 
     * 
     *  @purpose: inorder to validate the password
     * 
     *  @return: returns true if the password is valid and false if it is not
     *  
     * 
     */

     public function password($password) {
        if (strlen($password) > 6 &&  strlen($password ) < 25) {
            return true;
        }
         return false;
     }

    /**
     *
     *  @method: validateClientID
     * 
     *  @purpose: inorder to validate the client id so that it only contains a number and cannot be empty 
     * 
     * 
     *  @return: returns true if the client id is valid and false if it is not
     */


    public function clientID($clientID) {
        return !empty($clientID) ? filter_var($clientID, FILTER_VALIDATE_INT) : false;
    }


    /**
     *
     *  @method: confirmPassword 
     * 
     *  @purpose: inorder to confirm the password
     */
     public function confirmPassword($password, $confirmPassword) {
        if ($password === $confirmPassword) {
            return true;
        }
        return false;
     }


     /**
      *  @method: validateCompanyName 

        *  @purpose: inorder to validate the company name
        *  [a-zA-Z0-9]
      */
        public function companyName($companyName) {
           return filter_var($companyName, FILTER_SANITIZE_STRING);
        }


}