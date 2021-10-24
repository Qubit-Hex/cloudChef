<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class home extends Controller
{
  
    // return the home page 
    public function index($page = null) {
        
        return view('index');
    }
}
