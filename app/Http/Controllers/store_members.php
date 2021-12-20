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
        // FIX TO SHOW ONLY MEMBER OF THE USERS STORE INSTEAD OF THE WHOLE MEMBERS LIST
        // FOR ALL THE STORES. 

        // check the users access token to get the store id 
        $user = DB::table('users')->where('remember_token', $_COOKIE['accessToken'])->first();
        // get the store members associated with the store id
        $store = DB::table('store_members')->where('userID', $user->userID)->first();
         
        $members = DB::table('user_profile')->where('storeID', $store->storeID)->get();
        return response()->json( ['data' => $members,
        // add any aditional data to the response that you want to send back
                        'search' => $request->input('search')], 200);
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
}
