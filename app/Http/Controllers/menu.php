<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class menu extends Controller
{
    /**
     *
     *  @method: validation
     *
     *  @purpose: validate the request
     *
     */

    public function validation(Request $request) {
        // perform the necessary validations
        $token = $request->header('accessToken');

        $user = DB::table('users')->where('remember_token', $token)->first();

        if ($user) {
            $member = DB::table('store_members')->where('userID', $user->userID)->first();

            // get the store ID
            if ($member) {
                return $member->storeID;
            } else {
                return response()->json(['message' => 'You are not a member of any store'], 401);
            }
        } else {
            return false;
        }
    }



    /**
     *
     *  @method:  add
     *
     *  @purpose: inorder to add a menu to the system
     *
     */



     public function add(Request $request)
     {
        // validate the user

        // users can only add menu to their store

        $userStore = $this->validation($request);

        if (!$userStore) {
            return response()->json(['message' => 'You are not a member of any store'], 401);
        }

        // now lets perform the insert into the system

        // first validate the the input is only a-z numbers and spaces
        $userInput = $request->input('name');

        if (!preg_match('/^[a-zA-Z0-9 ]+$/', $userInput)) {
            return response()->json(['message' => 'Invalid input'], 401);
        }

        // request is valid so lets perfrom the insert into the system

        $menu = DB::table('store_menu')->insert([
            'store_id' => $userStore,
            'name' => $userInput,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            'active' => 1
        ]);

        // /CHECK has the insert succesfully been performed
        if ($menu) {
            return response()->json(['message' => 'Menu added successfully',
                                    'status' => 200], 200);
        } else {
            return response()->json(['message' => 'Menu could not be added'], 401);
        }
     }


     /**
      *   @method: get
      *
      *
      *  @purpose: inorder to fetch the menus of the store
      *
      */

    public function get(Request $request)
    {
        // validate the user

        // users can only add menu to their store

        $userStore = $this->validation($request);

        if (!$userStore) {
            return response()->json(['message' => 'You are not a member of any store'], 401);
        }

        // return the menus of the store
        $menus = DB::table('store_menu')->where('store_id', $userStore)->get();


        return response()->json(['message' => 'Menus fetched successfully',
                                'status' => 200,
                                'menus' => $menus], 200);
    }
}
