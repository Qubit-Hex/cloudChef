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

    // todo: get the authorization token from the login
    // api then compare it with the token in the database
    // if the token is valid then allow the user to access the the dashboard 
    // else return a 401 error
    
    public function handle(Request $request, Closure $next, $guard = null)
    {
        // AUTHORIZATION HEADERS

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
            return $next($request);
        }
    }

}