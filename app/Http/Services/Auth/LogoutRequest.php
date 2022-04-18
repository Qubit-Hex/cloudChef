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

        // destroy all php sessions and cookies and redirect the user...
        // destroy the session
        session_start();

        session_destroy();
        // destroy the cookies
        setcookie('accessToken', '', time() - 3600, '/');
        setcookie('refreshToken', '', time() - 3600, '/');
        // redirect the user to the login page
        return redirect('/login');
    }
}



?>
