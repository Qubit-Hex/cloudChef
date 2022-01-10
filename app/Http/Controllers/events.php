<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class events extends Controller
{
    // here is where will be the code for the server side events method

    public function __constructor()
    {

        // load the middlewares we rwquire of this controller 
        $this->middleware('auth');


    }

    // create a new event data structure

}