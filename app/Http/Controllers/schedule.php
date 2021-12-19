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
