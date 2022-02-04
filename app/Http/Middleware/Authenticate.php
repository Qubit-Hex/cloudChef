<?php

namespace App\Http\Middleware;


use Closure;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 *
 *  @class: authenticate
 *
 *  @purpose: to perform any actions that are required for the user to authorized or authenticated
 *
 */


class Authenticate
{

    public function handle(Request $request, Closure $next, $guard = null)
    {
        // Auth HEADERS

        // change this to be header instead of cookie for each request
        if (!empty($_COOKIE['accessToken'])) {
            // check if the access token is valid
            $userExist = DB::table('users')->where('remember_token', $_COOKIE['accessToken'])->exists();
            if ($userExist) {
                // access token is valid
                return $next($request);
            } else {
                // access token is not valid
                return response()->json([
                    'authenticated' => false,
                    'message' => 'Access Token is not valid', 'error' => 'Access Token is not valid'], 401);
            }
        } else {
            // tood - add a check for the access token in the header
            // check if the access token is valid
            return $next($request);
    }
}
    /**
     *
     *  @method: getTokenFromHeader
     *
     *
     *  @purpose: to get the token from the header TO AUTHENTICATE ANY REST API REQUESTS
     *
     */


    private function getTokenFromHeader(Request $request, Closure $next, $guard = null)
    {
        $header = $request->header('Authorization');
        if (!empty($header)) {
            $token = explode(' ', $header)[1];
            return $token;
        }
        return null;
    }

}
