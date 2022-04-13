<?php

/**
 *
 *  @file: validation.php
 *
 *  @purpose: inorder to validate the request data before we do any recipe related operations on our system
 *
 */

namespace App\Http\Services\employees\modules;

use Illuminate\Support\Facades\DB;


 class validation {


    /**
     *
     *  @method: validateUser
     *
     *  @purpose: checks if the user is a admin or not
     *
     */
    static function validateUser ($token) {
        $user = DB::table('users')->where('remember_token', $token)->first();
        if (!$user) {
            return false;
        }
        // now check what store does the user belong to and is the user a admin
        $store_member = DB::table('store_members')->where('userID', $user->userID)->first();

        if (!$store_member) {
            return false;
        }

        if ($store_member->store_role == 'admin') {
            return $store_member;
        }
        return false;
    }
}


?>
