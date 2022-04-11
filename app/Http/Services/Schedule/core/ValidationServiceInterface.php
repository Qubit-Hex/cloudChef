<?php

/**
 *
 *  @file: validation.php
 *
 *
 *  @purpose: inorder to perform schedule actions based on the The ScheduleServiceInterface
 *
 *
 */

namespace App\Http\Services\Schedule\core;
use Illuminate\Support\Facades\DB;



 /**
  *   @class: validation
  *
  *  @purpose: inorder to provide validation services for the user that is connected to the system
  *
  */


 class ValidationServiceInterface {

    /**
     *
     *  @method: isUserValid
     *
     *  @purpose: to validate the user that is connected to the system
     *
     */

    static function isUserValid($request)
    {


        // some validation logic
        $token = $request['token'];
        $user = DB::table('users')->where('remember_token', $token)->first();

        if (!$user) {
            return false;
        }
        // return the data from the user.
        return $user;
    }

    /**
     *
     *  @method: isStoreValid
     *
     *  @purpose: to validate the store that is connected to the system
     *
     */

     static function isStoreValid($response)
     {
        // find out if the user is a apart of a store
        $user = self::isUserValid($response);

        if (!$user) {
            return false;
        }

        // find out what store the user is a apart of
        // this might cause a bug if a user is apart of multiple stores.
        // get we might need some sort of logic to handle this.
        // but for now we will just get the first store that the user is apart of.
        $store = DB::table('store_members')->where('userID', $user->userID)->first();
        // find out if the user is apart of a store

        if (!$store) {
            return false;
        }
        return $store;
     }

     /**
      *  @method:  checkUserPermissions
      *
      *  @purpose: to check if the user has the permissions to perform the action
      */

      static function checkUserPermissions($request)
      {
        // check the permissions of the user.
        $user = self::isUserValid($request);
        $store = self::isStoreValid($request);
        // check

        // check the store role of the user
        if (!$store || !$user ) {
            return false;
        }

        // check the store permissions of the user

        if ($store->store_role === 'admin') {
            return $store->store_role;

        } else if ($store->store->role === 'user') {
            return $store->store_role;
        } else {
            // nothing was satifiied t  rigger an erorr in the system.
            return false;
        }

      }

      /**
       *
       *  @method: issueValidationToken
       *
       *  @purpose: to issue a validation token to the user
       *
       */

       static function issueValidationToken($request)
       {
           // generate a 256 bit token
            $token = openssl_random_pseudo_bytes(32);

            return $token;
       }

    /**
     *
     *  @method: validateUser
     *
     *
     *  @purpose: inorder to if the user is a standard user or an admin user
     *
     */

    static function validateUser($request)
    {
        // some validation logic for a standard user
        $user = self::isUserValid($request);
        if (!$user) {
            return false;
        }
        // is the user a apart of a store
        if (!self::isStoreValid(($request))) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not apart of any store.'
            ]);
        }
    }

    /**
     *
     *  @method: validateAdmin
     *
     *  @purpose: inorder to validate the request and check if the user is a super user or an admin
     *
     */

     static function validateAdmin($request)
     {
        // some validation logic for a admin user.
        $user = self::isUserValid($request);
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not apart of any store.'
            ]);
        }
        // check is the user is apart of a store.
        if (!self::isStoreValid(($request))) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not apart of any store.'
            ]);
        }

        if (self::checkUserPermissions($request) === 'admin') {
            return true;
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'You dont have permissions to access this resource.'
            ]);
        }
     }
}
?>
