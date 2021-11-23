<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use App\Http\Services\auth\tasks\authorizationRequest;
/**
 * this middleware is verify the our stateless authentication is actually taking place inorder to access the 
 * protected routes
 * 
 */

class userAccessControl
{

    public function __construct(authorizationRequest $authRequest)
    {
        $this->authRequest = $authRequest;
    }
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */


     /**
      *  in this handle we are going to set some custom headers to the response
      *  in order to the user to get properly authenticated
      */

     public function handle(Request $request, Closure $next)
     {
        // Send the tokens of our application 

        $token  = $_COOKIE['XSRF-TOKEN'];

        $response = $next($request);
        $response->header('Authentication', '');
        $response->header('signature', '');
        $response->header('token', '');
        
        if ($this->authRequest->isAuthorized($response)) {
            return $response;
        } else {
            // return a response with a 401 status code
            return response()->json(['error' => 'unauthorized'], 401);
        }
     }
}






