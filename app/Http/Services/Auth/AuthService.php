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
 use Illuminate\Support\Facades\DB;
 use App\Http\Services\Auth\RegistrationRequest;

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
            // EVERY TIME A REQUEST IS SENT TO THE AUTHENTICATION SERVICE
            // WE NEED A IMPLICIT OBJECT A RATE HANDLER 
            // INORDER TO HANDLE THE REQUEST
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
                return response()->json(['message' => 'Client ID is not valid', 
                            'error' => 'Invalid Client ID'], 400);
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
            // create a new registration request array 
            $input = [
                'name' => $request->input('fullname'),
                'username' => $request->input('email'),
                'password' => $request->input('password'),
                'company' => $request->input('company'),
                'token' => $request->input('_token'),
                'password_confirmation' => $request->input('password_confirm'),
                'time' => time(), // time stamp the request that we will be sending to our loginService
            ];

            // validate the request via  our api  


            // load our vaildation helper class 
            $isValid = new AuthValidation();


            // VALIDATE THE NAME OF THE USER   
            
            if (!$isValid::validateName($input['name'])) {
                return response()->json(['message' => 'Name is not valid', 
                            'error' => 'Invalid Name'], 400);
            }

            // VALIDATE EMAIL
            if (!$isValid::validateEmail($input['username'])) {
                return response()->json(['message' => 'Email is not valid email', 
                            'error' => 'Invalid Email'], 400);
            }

            // validate the password
            if (!$isValid::validatePassword($input['password'])) {
                return response()->json(['message' => 'Password is not valid', 
                            'error' => 'Invalid Password'], 400);
            
            }

             // check to see if the password and password confirmation are the same
             if (!$isValid::confirmPassword($input['password'], $input['password_confirmation'])) {
                return response()->json(['message' => 'Password and Password Confirmation do not match', 
                            'error' => 'Invalid Password Confirmation'], 400);
             }

            // VALIDATE COMPANY NAME
            if (!$isValid::validateString($input['company'])) {

                return response()->json(['message' => 'Company is not valid'], 400);
            }

            // VALIDATE TOKEN OUR CSRF TOKEN 
            if (!$isValid::checkIfEmpty($input['token'])) {
                return response()->json(['message' => 'Token is not valid', 
                            'error' => 'Invalid Token'], 400);
            }

            // if all our prechecks are passed then send the request to the registration service  
            
             $registrationRequest = new RegistrationRequest($input);

             return $registrationRequest->registerUser($input);
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