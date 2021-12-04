<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class dashboard extends Controller
{
    public function __construct()
    {
        // load user access control middleware inorder
        // to authentication users before they are allow access to the resource
        $this->middleware('auth');
    }
    //
    
    /**
     *  @method: index 
     *  
     * @purpose: this method is used to display the dashboard
     * 
     *  @return: return the dashboard view
     */
    public function index(Request $request)
    {
        return view('index');
    }
}
