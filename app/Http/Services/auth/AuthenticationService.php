<?php


/**
 *  @class: authenticationService 
 * 
 * 
 *  @purpose: inorder to provide authentication services for the user that is connected to the system
 * 
 *  @author: oliver shwaba -> Qubit-hEx
 */

namespace App\Http\Services\auth;


// load our authentication modules
use App\Http\Services\auth\tasks\validationRequest;
use App\Http\Services\auth\tasks\authenticationRequest;
use App\Http\Services\auth\tasks\registrationRequest;   
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuthenticationService
{


    public function __construct()
    {

        // INCLUDE THE AUTHENTICATION SERVICES OR MIDDLEWARE TO APPLY HERE 
         $this->validation = new validationRequest();
         $this->authentication = new authenticationRequest();
         $this->registeration = new registrationRequest();

    }

    // create  a qr code for the userz


    /**
     *  
     * @method: loginRequest
     * 
     * @purpose:  inorder to provide authentication services for the user that is connected to the system  
     * 
     *  @param: array $request
     * 
     * 
     *  @return: returns true if the login request was successful and false if it was not
     */

    public function loginRequest($input) {

        /**
         *  @purpose: inorder to validate the request before sending it to our authentication service
         * 
         */

         // clean up and input that our application doesnt allow 
         $input = $this->validation->sanitizeRequest($input);

        $response = array(
            'email' => $input['email'],
            'password' => $input['password'],
            'token' => $input['token'],
            'clientid' =>  $input['clientid'],
            'validationResponse' => $this->validation->createRequestToken(uniqid())

        );

        // VALIDATE EACH FLAG BEFORE MOVING ON THE THE NEXT STEP 

        if (!$this->validation->email($response['email'])) {
            return response()->json(['status' => false, 'message' => 'Email is not valid'], 401);
        } 

    
        if (!$this->validation->password($response['password'])) {
            return response()->json(['status' => false, 'message' => 'Password is not valid'], 401);
        }

        if (!$this->validation->clientID($response['clientid'])) {
            return response()->json(['status' => false, 'message' => 'Client ID is not valid'], 401);
        }
        
        //   PASS THE RESPONSE TO THE AUTHENTICATION MODULE
        return $this->authentication->authenticate($response);
    }

    /**
     * 
     * @method: registerRequest 
     * 
     * 
     *  @purpose: inorder to provide a registration request with our system
     * 
     * 
     *  @return: returns true if the registration request was successful and false if it was not
     */


    public function registerRequest($input){

        $input = $this->validation->sanitizeRequest($input);

        // form a response to send to the registration Request module 

        $response = [
            'email' => $input['email'],
            'name' => $input['name'],
            'password' => $input['password'],
            'password_confirm' => $input['password_confirm'],
            'company' => $input['company'],
            'name'=> $input['name'],
            'token' => $input['token'],
        ];

        // SOME VALIDATION CHECKS BEFORE THE INPUT GOES TO THE SERVER
         
        // check if the email is valid
        if (!$this->validation->email($response['email'])) {
            return response()->json(['status' => false, 'message' => 'Email is not valid'], 401);
        } 

        // check the password rules 
        if (!$this->validation->password($response['password']) || !$this->validation->password($response['password_confirm'])) {
            return response()->json(['status' => false, 'message' => 'validation rules were not met!'], 401);
        }

        // check if the company name is valid
        if (!$this->validation->companyName($response['company'])) {
            return response()->json(['status' => false, 'message' => 'Company name is not valid'], 401);
     
        }
        // confirm Password 
        if ($response['password'] != $response['password_confirm']) {
            return response()->json(['status' => false, 'message' => 'Password does not match'], 401);
        }

        return $this->registeration->register($response);
    }

    /**
     *  @method: logoutRequest
     * 
     * 
     * 
     *  @purpose: inorder to provide a logout request with our system remember our system is state less that means what we going to be 
     *              destroying a physicall session stored in the database
     * 
     *  @return: returns true if the logout request was successful and false if it was not
     * 
     */


     public function logoutRequest(Request $request) {

        // validate the session destroy request

        $signature = $request->header('signature');
        $userFetch = DB::table('users')->where('digital_access_tokens', $signature)->first();

        // check if the user access token is the same to value that we have 
        if ($userFetch == null) {
            return response()->json(['status' => false, 'message' => 'Invalid signature'], 401);
        }

        // next once signature is validated we can destroy the session
        // and send  a response back the clinet
        DB::table('users')->where('digital_access_tokens', $signature)->update(['digital_access_tokens' => null]);

        // erase the session that the user has created 
        $response = [
            'status' => true,
            'request' => 'logout',
            'message' => 'You have been logged out successfully'
        ];

        return response()->json($response, 200);
     }

}
?>