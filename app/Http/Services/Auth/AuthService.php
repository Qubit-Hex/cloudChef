<?php


/**
 * 
 *  @class: authenticationProvider 
 * 
 *  
 * @Purpose: this class is used to provide authentication services for the user that is connected to the system 
 * 
 * 
 *  @author: oliver shwaba -> Qubit-hEx
 * 
 */

 namespace App\Http\Services\Auth;


 use Illuminate\Http\Request;
 use Illuminate\Http\Response;

 use App\Http\Services\Auth\AuthValidation;

 // Request Modules 




 class AuthService {

    
        /**
        * 
        *  @method: login
        *  
        *  @purpose: to form the login request the will be sent to the authentication service
        * 
        *  @param: array $request;
        */
    
        static function login(Request $request)
        {
            // create a new authenticaton object 
            $input = [
                'username' => $request->input('username'),
                'password' => $request->input('password'),
                'token' => $request->input('_token'),
                'clientID' => $request->input('clientId'),
                'time' => time(), // time stamp the request that we will be sending to our loginService
            ];


            // validate the request

            $isValid = new AuthValidation();

            // is the email valid
            if (!$isValid::validateEmail($input['username'])) {
                return response()->json(['message' => 'Email is not valid email', 
                            'error' => 'Invalid Email'], 400);
            }

            // is the password request valid 

            if (!$isValid::validatePassword($input['password'])) {
                return response()->json(['message' => 'Password is not valid', 
                            'error' => 'Invalid Password'], 400);
            }

            // is the client id valid 
            if (!$isValid::validateClientID($input['clientID'])) {
                return response()->json(['message' => $input['clientID'], 
                            'error' => 'Invalid Client ID', 'id' => $input['clientID']], 400);
            }

            // is the token valid
            if (!$isValid::checkIfEmpty($input['token'])) {
                return response()->json(['message' => 'Token is not valid', 
                            'error' => 'Invalid Token'], 400);
            }
            // if all the request is valid then send LoginRequest
            // send the request to the login Service 

            return LoginRequest::login($input);
        }
    
        /**
        *  @method: register 
        * 
        *  @purpose: to register a new user to the system
        *  @param: array $request
        */
    
        static  function register(Request $request)
        {


        }


        /**
         *  @method: logout
         * 
         *  @purpose: to logout the user from the system 
         * 
         * 
         * 
         */

         static function logout(Request $request)
         {

         }

 }


?>