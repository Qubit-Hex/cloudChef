<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class store extends Controller
{
    /**
     *
     * @method: get
     *
     *  @purpose: inorder to get the access to get the store data
     *
     */


    public function get(Request $request)
    {
        $storeRequest = [
            'storeID' => $request->input('storeID'),
            'token' => $request->header('accessToken'),
            'requestTime' => $request->input('time'),
            // here is where we will issue the command that the use has requested
            // image this a routing a network of requests in our api

            'command' => $request->header('command'),

        ];


        if ($storeRequest['token'] === null) {
            return response()->json(['error' => 'token is required'], 401);
        }

        $user = DB::table('users')->where('remember_token', $storeRequest['token'])->first();

        if ($user) {
            $storeMember = DB::table('store_members')->where('userID', $user->userID)->first()->storeID;

            if ($storeMember) {
                $store = DB::table('store')->where('storeID', $storeMember)->first()->name;

                return Response()->json(['status' => 'success', 'store' => $store]);
            }
        }

        return Response()->json(['status' => 'failure']);
    }

}
