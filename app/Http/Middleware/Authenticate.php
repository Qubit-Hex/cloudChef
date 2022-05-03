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
 *
 */

class Authenticate
{

    public function handle(Request $request, Closure $next, $guard = null)
    {


        if (isset($_COOKIE['accessToken'])) {
            $accessKey = $_COOKIE['accessToken'];
        } else{
            $accessKey = $request->header('accessToken');
        }

        if (isset($accessKey)) {
            // authentication the user
            $user = DB::table('users')->where('remember_token', $accessKey)->first();

            // make sure the user is not null
            if (!$user) {
                // destroy the cookie
                setcookie('accessToken', '', time() - 3600, '/');
                return "Unauthorized please click  <a href='/login'>here </a> to login";
            }


            $user_session = DB::table('user_sessions')->where('user_id', $user->userID)->first();

            if (!$user_session)  {
                // only let the user procceed to the login page if the user is not authenticated
                // destroy the cookie
                setcookie('accessToken', '', time() - 3600, '/');
                // return 401 page
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            // compare the token we have with the one in the database
            if ($user->remember_token === $user_session->token) {
                // check when the user_session token was created after three hours
                // destroy the session
                if ($user_session->active === 0) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'session has expired'
                    ], 401);
                }
                // check when session was created
                $sessionTime = $user_session->updated_at;
                $sessionTime = strtotime($sessionTime);
                // check when the session was created after three hours
                $sessionTime = $sessionTime + (3 * 60 * 60);

                if ($sessionTime < time()) {
                    // set the session to 0
                    DB::table('user_sessions')->where('user_id', $user->userID)->update(['active' => 0]);
                    // delete the record... kill the session that we have created
                    DB::table('user_sessions')->where('user_id', $user->userID)->where('token', $user->remember_token)->delete();

                    return response()->json([
                        'status' => 'error',
                        'message' => 'session has expired'
                    ], 401);
                }

                // check if the session in the database is still valid
                // if not destroy the session
                if ($user_session->updated_at < date('Y-m-d H:i:s', time() - (3 * 60 * 60))) {
                    // set the session to 0
                    DB::table('user_sessions')->where('user_id', $user->userID)->update(['active' => 0]);
                    // delete the record... kill the session that we have created
                    DB::table('user_sessions')->where('user_id', $user->userID)->where('token', $user->remember_token)->delete();

                    return response()->json([
                        'status' => 'error',
                        'message' => 'session has expired'
                    ], 401);
                }

                // might add a method to check if the user is a admin or not...
                return $next($request);
            } else {
                // destroy the cookie it is invalid
                setcookie('accessToken', '', time() - 3600, '/');
                // return 401 page
                return response()->json(['error' => 'Unauthorized'], 401);
            }

        } else {
            return redirect('/login');
        }
    }
}
