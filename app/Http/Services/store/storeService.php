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

        $user = DB::table('users')->where('remember_token', $storeRequest['token'])->first()->userID;

        if ($user) {
            $storeMember = DB::table('store_members')->where('userID', $user)->first()->storeID;

            if ($storeMember) {
                $store = DB::table('store')->where('storeID', $storeMember)->first()->name;

                return Response()->json(['status' => 'success', 'store' => $store]);
            }
        }

        return Response()->json(['status' => 'failure']);
    }

 }


?>
