<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 *
 *  @controller: home
 *
 *  @purpose: inorder to render the landing page of our application
 *
 */


class home extends Controller
{

    public function __construct()
    {

    }


    // return the home page
    public function index($page = null) {

        return view('index');
    }

    /**
     *
     *  @method: loginPage
     *
     *
     *  @purpoe: to check if the user is logged in and if so redirect to the dashboard
     */

    public function loginPage(Request $request) {
        // check if the user is logged in
        if (isset($_COOKIE['accessToken'])) {
            // user is logged in
            return redirect('/dashboard');
        } else {
        // user is not logged in
            return view('index');
        }
    }
}
