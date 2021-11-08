<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;


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
      
    }

/*
    type of login functionality session and token based 

    session based: grabs the session and compare it to our records 
*/ 
    public function login()
    {

    }
    /**
     *  registration function
     * 
     * 
     */

    public function register()
    {
      
    }
     /**
      *     logout function
      */

     public function logout()
     {
      
     }

     public function resetPassword()
     {
      
     }

     public function index()
     {
      //   return view('welcome');

     }
}