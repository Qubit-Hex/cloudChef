<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;



/**
 *
 *  @class: employee
 *
 *
 *  @purpose: inorder to perform the employee CRUD operatations
 *
 *
 */


class employee extends Controller
{

    /**
     *
     *  @method: get
     *
     *  @purpose: inorder to get the employee details by the id number of a store
     *
     */

    public function get(Request $request, $id) {

        $clientToken = $request->header('accessToken');

        // check if the user exists in the database
        $user = DB::table('users')->where('remember_token', $clientToken)->first();

        if ($user) {
            // next check if the user belongs to the store we are assocated with
            $store_members = DB::table('store_members')->where('userID', $user->userID)->first();

            if ($store_members) {
                // next lets check if the
                $employee = DB::table('employee')->where('storeID', $store_members->storeID)->where('id', $id)->first();

                $userImg = DB::table('user_profile')->where('userID', $employee->userID)->first()->img;

                // if the employee exists
                if ($employee) {
                    // next we need to retrive other other information before returning the employee data to the client

                    // PLEASE NOTE: WE NEED SOME DATABASE REFACTORING HERE
                    // SO THAT WE DONT HAVE TODO HACKY STUFF INORDER TO GET OUR DATA
                
                    $department = DB::table('department')->where('id', $employee->department_id)->first()->name;

                    return response()->json([
                        'name' => $employee->first_name . ' ' . $employee->last_name,
                        'department' => $department,
                        'url' => $userImg
                    ]);

                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'employee not found'
                    ]);
                }
            }
            // trigger error user does not belong to the store
            return response()->json(['error' => 'user does not belong to the store'], 401);
        }
        return response()->json(['message' => 'failed'], 401);
    }


}
