<?php


/**
 * 
 * 
 *   class: authentication 
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
use App\Http\Services\auth\auth;
;


class authentication extends Controller
{
    public function __construct()
    {

        // include the authentication middleware and other authentication services 

        $this->auth = new auth();
    }


    /**
     *  
     * @method: validatelogin
     * 
     *  @purpose:  inorder to provide authentication services for the user that is connected to the system  
     * 
     *  @param: array $request
     * 
     */


    public function validatelogin($input)
    {
        // validate the login details
        return $this->auth->init($input);
    }

    /**
     * 
     *  @method: login
     *  
     *  @purpose: to provide the login page for the user
     * 
     *  @param: request
     * 
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
        'clientid' => $request->input('client-id'),
      ];

        /*
            validate the login request

            if the validation is successful
            then redirect the user to the dashboard
            else redirect the user to the login page    
        */

        if($this->validateLogin($input))
        {
            return redirect()->route('dashboard');
        }
        else
        {
            return redirect()->route('login');
        }
    }


    /**
     * 
     *  @method: logout
     * 
     * 
     *  @purpose: to provide loging out services for the user 
     * 
     */
    
     public function logout(Request $request)
     {

     }


     /**
      *  @method: register
      
        *  @purpose: to provide the registration page for the user
        
     */
     public function register(Request $request)
     {

     }

}