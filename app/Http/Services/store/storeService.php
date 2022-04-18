<?php


/**
 *
 *  @class: storeService
 *
 *
 *  @purpose: this is the service provider for the store
 *
 */


namespace App\Http\Services\store;


use Illuminate\Support\Facades\DB;

 class storeService {



    /**
     *  @method: getStore
     *
     * @purpose: this will fetch the store data from the server and return it to the client
     *
     */

    public static function getStore($storeRequest) {

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

    /**
     *
     *  @method: makeStore
     *
     *  @purpose: this will create a new store for the user
     */

    public static function makeStore($request)
    {
        // some logic here to make a new store for the user.
    }

 }


?>
