<?php

/**
 * 
 *  class: AuthorizationRequest 
 * 
 * 
 *  @purpose: inorder to proccess the incomming request tokens to ensure that they are valid
 * 
 *          the things we will do is to check if the token is valid and if it is then we will check if the user is authorized to access the resource
 *          
 * 
 *           Authorization: Bearer <token>
 *           Token: <token>
 *           Signature: <signature> => 
 *  
 */




namespace App\Http\Services\auth\tasks;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\sessions;
use Dotenv\Repository\RepositoryInterface;
use Illuminate\Support\Facades\DB;

class authorizationRequest {

    private $token;
    private $signature;
    private $user;
    private $request;
    private $request_type;


    public function __constructor(Request $request) {

        $this->request = $request;
        $this->request_type = $request->header('Authorization');
        $this->token = $this->request->header('Token');
        $this->signature = $this->request->header('Signature');
        $this->user = new User();
        $this->session = new sessions();

    }


    /**
     *  @method: verifySignature
     * 
     *  @purpose: inorder to verify the request signature in the authorization header 
     * 
     */


     public function verifyRequestSignature() {
        return false;
    }

    /**
     *  @method: verifyToken 
     * 
     * 
     *  @purpose: inorder to verify the token in the authorization header
     * 
     * 
     */

    public function verifyRequestToken() {
        $user = $this->user;
        $token = $this->token;

        return $token == $user->remember_token ? true : false;
    }

    /**
     * @method: validateStatelessSession
     * 
     *  @purpose: this is inorder to validate the stateless session once we make a request to the backend service of the appliocation 
     *              we will check the database if the session exists or is even valid operation 
     */

     public function validateStatelessSession($signature, $token) {
        $session = $this->session::where('signature', $signature)->where('token', $token);
        // now lets sort the tokesn returns by time 
        $time = $session::orderBy('session_expiry', 'desc')->first();
        return $time->session_expiry > time() ? true : false;
     }

     /**
      * @method: validateUsersRoles
      *
      * @purpose: once we have any request to the backend service of the application we will check if the user is authorized to access the resourc 
      * 
      */

      public function validateUsersRole($signature) {

      }

}
    
?>