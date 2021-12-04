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
 */


namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Services\Auth\AuthService;



class authentication extends Controller
{
    public function __construct()
    {
      // initilize the authentication service 
      $this->auth = new AuthService();
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
      // form our login request
      return $this->auth::login($request);
    }

    /**
     *  @method: register 
     * 
     *  @purpose: to register a new user to the system
     *  @param: array $request
     */

    public function register(Request $request)
    {
      $this->auth::register($request);

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
      $this->auth::logout($request);
    }
}