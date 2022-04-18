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
        if (isset($_COOKIE['accessToken'])) {
            // authentication the user
            $user = DB::table('users')->where('remember_token', $_COOKIE['accessToken'])->first();

            if (!$user) {
                // if the user is not authenticated
                return response()->json([
                    'status' => 'error',
                    'message' => 'You are not authenticated'
                ], 401);
            }

            $user_session = DB::table('user_sessions')->where('user_id', $user->userID)->first();

            if ($user->remember_token === $user_session->token) {
                // check when the user_session token was created after three hours
                // destroy the session
                if ($user_session->active === 0)  {
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

                    return response()->json([
                        'status' => 'error',
                        'message' => 'session has expired'
                    ], 401);
                }
                // might add a method to check if the user is a admin or not...
                return $next($request);
            } else {
                return response()->json(['error' => 'unauthorized'], 401);
            }

            return $next($request);
        } else {
            return redirect('/');
        }
    }
}

