<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/***
 * 
 *  @controller: store_members
 * 
 * @purpose: inorder to get store profile data and store members data
 * 
 */


class store_members extends Controller
{

    /**
     *   @method: get
     * 
     *  @purpose: inorder to get store profile data and store members data
     * 
     * 
     */

    public function get(Request $request)
    {

        // CHANGE THE TO A INPUT FOR THE FRONT END TO PASS THE TOKEN RATHER THAN RELAYING 
        // ON A COOKIE INCASE OF A HEADLESS BROWSER... OR A FAKE COOKIE TO BYPASS THE AUTHENTICATION

         if (empty($_COOKIE['accessToken'])) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not logged in'
            ]);
        }

        // CHECK THE COOKIE AND DOES IT EXIST IN THE DATABASE

        $user = DB::table('users')->where('remember_token', $_COOKIE['accessToken'])->first();

        if ($user == null) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not logged in'
            ]);
        }

        // GET THE STORE PROFILE DATA
        $user = DB::table('users')->where('remember_token', $_COOKIE['accessToken'])->first()->userID;
        // get the store members associated with the store id
        $store = DB::table('store_members')->where('userID', $user)->first();
        // return all the results that doesnt have the current user id
        $members = DB::table('user_profile')->where('storeID', $store->storeID)->where('userID', '!=', $user)->get();
        
        return response()->json( ['data' => $members], 200);
    }

    /**
     * 
     *  @method: update 
     * 
     * 
     * 
     *  @purpose: inorder to update store profile data and store members data
     * 
     */

    public function update(Request $request, $id = null)
    {


    }



    /**
     * 
     * @method: add 
     * 
     * @purpose: inorder to add store profile data and store members data
     * 
    */
    
    
    public function add(Request $request)
    {

    }



    /**
     *  
     *  @method: find
     * 
     *  @purpose: inorder to find a store member in the database 
     * 
     */

    public function find(Request $request)
    {

        $input = $request->input('id');

        $userData = DB::table('users')->where('remember_token', $request->header('accessToken'))->first();

        if ($userData == null) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not logged in'
            ]);
        }

        // proccessed to get the request 

        $currentUserID = $userData->userID;

        $storeOwnership = DB::table('store_members')->where('userID', $currentUserID)->first()->storeID;

        if ($storeOwnership == null) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not a member of a store'
            ]);
        }

        // return the users nam

        $storeMember = DB::table('user_profile')->where('storeID', $storeOwnership)->where('userID', $input)->first()->name;

        return response()->json(['data' => $storeMember], 200);

    }
}
