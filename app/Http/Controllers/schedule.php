<?php

/**
 * 
 *  @class: Schedule 
 * 
 * 
 *  @purpose: inorder to perform the employee schedule CRUD operatations 
 * 
 */

namespace App\Http\Controllers;

use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;

class schedule extends Controller
{
 

    public function __construct(Request $request)
    {   
        $this->RequestObject = $request;
        $this->requestToken = bin2hex(openssl_random_pseudo_bytes(32));

    }

    /**
     *  
     *  @method: viewSchedule 
     *
     *  @purpose: inorder to view the employee schedule  
     */

     public function viewSchedule(Response $response)
     {
         
     }
}
