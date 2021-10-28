<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class authentication extends Controller
{

    /**
     * 
     *  our constructor is going to preform some checks inorder to see if our application will go ahead and preform the actions or not 
     * 
     * 
     */

    public function __construct()
    {
    
        session_start();
    }

    /**
     * 
     *  func:  getPostData 
     * 
     *  purpose: inorder to grab our user post data and return it back in json format, but also to generate validation checks and sanitization for the input that we have recieved!
     */
    
    public function getPostData() {

        // sanitize the input that user provided!
        $postData = filter_var_array($_POST, FILTER_SANITIZE_STRING);

        if (empty($postData)) {
            $errorObject = [
                'message' => 'Your post data is empty invalid',
                'code' => '400',
                'status' => 'error'                
            ];

            return $errorObject;
        } 
        return $postData;
    }

    // generate a uniqid token for the user 
    private function generateUniqueID() {
        return uniqid();
    }

    // here we create a session for the user using the unique id as the salt

    private function generateToken($token, $uid) {

        return hash('sha256', $token . $uId);
    } 

    // this is going to form a jsoon  object by the server giving us a public key
    // and the user by using the public key we can encrypt the user data and send it back to the user
    private function generateJsonWebToken($user) {

        $payload = [
            'id' => null,
            '_token' => null,
            '_session' => null,
            'host' => 'http://localhost:8000',
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + (60 * 60)
        ];


        return JWT::encode($payload, $this->key);
    }



    private function fetchAccessToken($token, $public, $private) {

    }

/*
    type of login functionality session and token based 

    session based: grabs the session and compare it to our records 
    token based: grabs the token and compare it to our records
    we also use something called a session token to make sure that the user is not a bot and that the user is not a hacker

*/ 
    public function login()
    {
        $postData = $this->getPostData();       

    }

    /**
     * 
     *   errorObject
     * 
     *  this function is to provice you with a dynamic error creatation helper function so if we hit an exception its one line of code inorder to log the data  
     *  format: => JSON
     */
    public function errorObject($request = null, $errorMessage, $errorType) {
        $errorObject = [
            message => $errorMessage,
            request => $request,
            errorType => $errorType,
        ];
        return $errorObject;
    }

// VERIFY OUR PATH AND ALSO PREVENT AND SNOOPING AROUND
    public function requestType($request = null) {
        if ($request === 'login') {
            return $this->login();
        } else if ($request === 'register') {
            return $this->register();
        }

        return $this->errorObject($request, "Request Type isn't valid", "exception");
    }
}