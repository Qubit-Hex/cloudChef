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
     return  $this->auth::register($request);

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
      return  $this->auth::logout($request);
    }

    /**
     *
     *  @method: verify
     *
     *  @purpose: to verify the user that is connected to the system it take a token value as the input when funneling the request
     *
     */


    public function verify(Request $request)
    {
      return  $this->auth::verify($request);
    }


    /**
     *
     *  @method: checkPermissions
     *
     *
     *  @purpose: to check the permissions of the user that is connected to the system
     *
     *  @param: array $request ( we will use the token value as the input) inorder to validate the user and return
     *          a permission token that will be used to check the permissions of the user
     */

    public function checkPermissions(Request $request)
    {

    }
}
