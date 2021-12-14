<?php

/**
 * 
 *  class: Enforcer
 * 
 * 
 * 
 *  @purpose: inorder to check the login credintials of the user before issuing a token for our client to use.
 */


namespace App\Http\Services\Auth;

use Illuminate\Support\Facades\DB;
use App\Http\Services\Auth\modules\encryption as ModuleEncryption;
use Illuminate\Http\Request;


class Enforcer {




    static function authenticate($messageArray)
    {
      // change thre accessToken of the user then return our auth token 
        // to the client

        $accessToken = DB::table('users')->where('email', $messageArray['username'])->value('remember_token');

        $encryption = new ModuleEncryption();


        // chanbge the access token of the user to RSA -> 256 bit
        // and return the new access token to the client
        
        $newToken = $encryption->random(32);

        $updateAccessToken = DB::table('users')->where('email', $messageArray['username'])->update(['remember_token' => $newToken]);

        // check if the accessToken has been updated 
        if ($updateAccessToken) {


            setcookie('accessToken', $newToken, time() + (86400 * 30), "/");
            
            return response()->json([
                'accessToken' => $accessToken, 
                'message' => 'You are now logged in',
                'authenticated' => true,
                'redirect' => '/dashboard/'], 200);
        } else {
            return response()->json(['message' => 'Access Token could not be updated', 
                                 'error' => 'Access Token could not be updated'], 400);
        }

    }


    /**
     * 
     *  @method: authorize 
     * 
     *  @purpose: to check if the user has the right to access the page and / or modify a resource in our REST API
     * 
     */

     static function authorize(Request $request)
     {
        // check if the user has the right to access the page and / or modify a resource in our REST API
         $messageArrray = [
             'token' => $request->header('accessToken'),
             'bearer' => $request->header('bearer'),
             'authorization' => $request->header('authorization'),
             'JWT' => $request->header('JWT'),
         ];

     }

}



?>