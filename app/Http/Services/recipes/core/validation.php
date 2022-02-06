<?php

/**
 *
 *   @file: va;idation.php
 *
 *   @purpose: inorder to validate the request data before we do any recipe related operations on our system
 *
 */


namespace App\Http\Services\recipes\core;


use Illuminate\Support\Facades\DB;


/**
 *
 *  @class: validation
 *
 *
 *  @purpose: inorder to validate the request data before we do any recipe related operations on our system
 *
 */

class Validation {


    /**
     *
     *  @method: validateUser
     *
     *  @purpose: inorder to validate the user credentials before we do any recipe related operations on our system
     *
     */

     public function validateUser($token)
     {
         // check to see if the user is valid and exists in the system
         if (DB::table('users')->where('remember_token', $token)->exists()) {
             return true;
         } else {
             return false;
         }
     }

     /**
      *  @method: validateUserPermissions
      *
      *  @purpose: inorder to validate the users permissions of the specific store
      *             before we grant access to any recipe related to operations in our system
      *
      */

     public function validateUserPermissions($token)
     {
        $user = DB::table('users')->where('remember_token', $token)->first();

        if ($user) {
            $store_member = DB::table('store_members')->where('userID', $user->id)->first();
            // catch the store member
                if (!$store_member) {
                    return false;
                }

            // check if the user has rights to edit the recipe or not
                if ($store_member->store_role === 'admin') {
                    return true;
                } else {
                    return false;
                }
        }
        return false;
    }
    
}


?>
