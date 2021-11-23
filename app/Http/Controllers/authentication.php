<?php
/**
 * 
 * 
 *   @class: authentication 
 * 
 * 
 *  @purpose:  inorder to provide authentication services for the user that is connected to the system
 * 
 * 
 *  @author: oliver shwaba -> Qubit-hEx
 * 
 * 
 */


namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Services\auth\AuthenticationService;



class authentication extends Controller
{
    public function __construct()
    {

       // INCLUDE THE AUTHENTICATION SERVICES HERE

        $this->authenticationService = new AuthenticationService();
    }

    /**
     * 
     *  @method: login
     *  
     *  @purpose: to form the login request the will be sent to the authentication service
     * 
     *  @param: arrayt $request;
     */

    public function login(Request $request)
    {

      /*
        build a login request data object!
        for the login request
      */

      $input = [
        'email' => $request->input('username'),
        'password' => $request->input('password'),
        'token' => $request->input('_token'),
        'clientid' =>  filter_var($request->input('clientId'), FILTER_VALIDATE_INT)
      ];
        return $this->authenticationService->loginRequest($input);
    }

    /**
     *  @method: register 
     * 
     *  @purpose: to register a new user to the system
     *  @param: array $request
     */

    public function register(Request $request)
    {
      /**
       *  build a register request data object!
       *  for the register request 
       * 
       */

        // registeration array request 
        $input = [

            'email' => $request->input('email'),
            'name' => $request->input('fullname'),
            'password' => $request->input('password'),
            'token' => $request->input('_token'),
            'company' => $request->input('company'), 
            'password_confirm' => $request->input('password_confirm')

        ];

        return $this->authenticationService->registerRequest($input);
    }

    /**
     *  @method: logout
     * 
     *  @purpose: to logout the user from the system
     * 
     *  @param: array $request
     */ 

    public function logout(Request $request)
    {
      // we need to send the signature to the logout request 
        // logout the user
         return $this->authenticationService->logoutRequest($request);
    }
}