<?php

/**
 *
 *  @class: LogoutRequest
 *
 *
 *  @purpose: inorder to process the logout request
 *
 */


namespace App\Http\Services\Auth;




class LogoutRequest {

    public function __construct() {

    }


    static function logout($request) {

        // query that hold our information....
        $query = [
            'token' => $request->header('accessToken'),
            'data' => $request->all()
        ];

    }
}



?>
