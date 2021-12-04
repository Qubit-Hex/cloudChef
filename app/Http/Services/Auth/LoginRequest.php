<?php

/**
 * 
 *  @class: LoginRequest 
 * 
 * 
 *  @purpose: this class is to preform the login request of the user 
 * 
 */

 namespace App\Http\Services\Auth;


 use Illuminate\Support\Facades\DB;
 use App\Http\Services\Auth\Modules\ModuleEncryption;
 use App\Http\Services\Auth\Enforcer;

 class LoginRequest {


    /**
     *  @method: login
     * 
     * 
     * @purpose: this method will be performing the login request and returning a resposne based on the requests Input
     * 
     * 
     */

    static function login($messageArray)
    {

        $userExists = DB::table('users')->where('email', $messageArray['username'])->exists();
        // NOW THAT THE INPUT IS VALIDATED WE A GOING TO PREFORM THE LOGIN REQUEST

        if ($userExists) {
            // check if the password is valid for the user 
            $password = DB::table('users')->where('email', $messageArray['username'])->value('password');

            if ($password === $messageArray['password']) {
                // password is valid 
                //  check the status of the user 

                $status = DB::table('users')->where('email', $messageArray['username'])->value('status');

                if ($status === 1) {
                 // display response that the user has been banned 
                    return response()->json(['message' => 'User has been banned', 
                                'error' => 'User has been banned'], 400);
                }
                // check if the store exists in the database 

                $storeExists = DB::table('store')->where('storeID', $messageArray['clientID'])->exists();

                if ($storeExists) {
                    // store exists 
                        // now get the role of the user 
                        $userID = DB::table('users')->where('email', $messageArray['username'])->value('userID');
                        $storeRole = DB::table('store_members')->where('storeID', $messageArray['clientID'])->where('userID', $userID)->value('store_role');

                          // IF WE REACH HERE THE USER HAS BEEN VERIFIED AND THE STORE EXISTS 
                          // WE BELONG TO THE STORE NOW ITS TIME TO AUTHENTICATE THE USER BASED ON THE AUTHORIZATION AND ROLE 
                            return Enforcer::authenticate($messageArray);
                } else {
                    return response()->json(['message' => 'Store does not exist', 
                                'error' => 'Store does not exist'],  400);
                }
                
                return response()->json(['message' => 'Login Successful', 'error' => 'none'], 200);
            } else {
                return response()->json(['message' => 'Password is not valid', 'error' => 'Invalid Password'], 400);
            }
                // password is valid 
                // check if the user is active 
              
        } else {
            // return a response that the user does not exist
            return response()->json(['message' => 'User does not exist', 
                            'error' => 'User does not exist'], 400);
        
    }
 }


}


?>