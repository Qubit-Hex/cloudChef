<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\store\StoreServiceProvider;


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

        // REDESIGN THIS DATA STRUCTURE TO FIT OUR NEW ARCHITECTURE DESIGN
        $storeRequest = [
            'storeID' => $request->input('storeID'),
            'token' => $request->header('accessToken'),
            'requestTime' => $request->input('time'),
            // here is where we will issue the command that the use has requested
            // image this a routing a network of requests in our api

            'command' => $request->header('command'),

        ];

        return StoreServiceProvider::getStore($storeRequest);
    }
}
