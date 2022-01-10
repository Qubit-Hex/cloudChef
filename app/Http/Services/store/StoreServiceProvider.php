<?php

/**
 *
 *  @class: StoreServiceProvider
 *
 *  @description: this is the service provider for the store
 */


namespace App\Http\Services\store;

use App\Http\Services\store\storeService;



class StoreServiceProvider {


         /**
        *
        *  @method: get
        *
        *  @purpose: inorder to get the access to get the store data
        *
        */

        static function getStore($storeRequest)
        {

            // REDESIGN THIS DATA STRUCTURE TO FIT OUR NEW ARCHITECTURE DESIGN
            $storeRequest = [
                'storeID' => $storeRequest['storeID'],
                'token' => $storeRequest['token'],
                'requestTime' => $storeRequest['requestTime'],
                'command' => $storeRequest['command'],
            ];

            return storeService::getStore($storeRequest);
        }

 }

?>
