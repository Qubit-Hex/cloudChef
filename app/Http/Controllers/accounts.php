<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class accounts extends Controller
{
    /**
     *
     *  @method: reset_password
     *
     *  @purpose: to reset the password of the user
     *
     */

    public function reset_password(Request $request)
    {
        // logic inorder to reset the password of the user
    }


    /**
     *
     *  @method: activate_account
     *
     *  @purpose: to activate the account of the user
     *
     */

     public function activate_account(Request $request, $token)
     {
        // logic inorder to activate the account of the user
     }
}
