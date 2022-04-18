<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

/**
 *
 *  @controller: dashboard
 *
 *
 *  @purpose: inorder to get the dashboard data
 *
 *
 */

class dashboard extends Controller
{
    public function __construct()
    {
        // load user access control middleware inorder
        // to authentication users before they are allow access to the resource
        $this->middleware('auth');

    }
    //


    public function contacts()
    {
        return view('dashboard.contacts');
    }

    /**
     *  @method: index
     *
     * @purpose: this method is used to display the dashboard this is SPA entry point
     *
     *  @return: return the dashboard view
     */
    public function index(Request $request, $page = null)
    {
            return view('index');
    }
}
