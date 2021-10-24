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
        if (session_start()) {

        } else {
            // something went wrong trigger and error 
        }
    }


    public function initTokenSession($token)
    {
        session_start();

        return $_SESSION['_token_'] = $token;
    }


    /**
     * 
     *  func:  getPostData 
     * 
     *  purpose: inorder to grab our user post data and return it back in json format, but also to generate validation checks and sanitization for the input that we have recieved!
     */
    
    public function getPostData() {

        // generate our post object
        $userObject = [
            'username' => $_POST['username'],
            'name' => $_POST['name'],
            'company' => $_POST['company'],
            'password' => $_POST['password'],
            'token' => $_POST['_token'],
            'authenticated' => false,
            'authorization' => false,

        ];

        // our error object for the request 
        $errorObject = [
            'error' => 'request rejected'
        ];


        if ($_POST['password'] === $_POST['password-confirm']) {
            $this->initTokenSession($userObject['token']);
            return json_encode($userObject);
        }

        return json_encode($errorObject);
    }

// login functionality 
    public function login()
    {
        $postData = $this->getPostData();
    }

    // logout user 

    public function logout()
    {
        $postData = $this->getPostData();
    }

    // provide user registration
    public function register() {

    }
    /**
     * 
     *   errorObject
     * 
     *  this function is to provice you with a dynamic error creatation helper function so if we hit an exception its one line of code inorder to log the data  
     *  format: => JSON
     */
    public function errorObject($request = null, $errorMessage, $errorType) {

    }

// this a call to call the requests based on what the request type is
    public function requestType($request = null) {
        if ($request === 'login') {
            return $this->login();
        } else if ($request === 'register') {
            return $this->register();
        }

        return $this->errorObject($request, "Request Type isn't valid", "exception");
    }
}