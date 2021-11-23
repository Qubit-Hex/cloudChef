<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
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
    

     public function handle(Request $request, Closure $next)
    {
        // HEADER       
        $authorization = $request->header('Authorization');
        $enforcer = new $this->authRequest($request);

        if ($enforcer->verifyRequestSignature()) {
            return $next($request);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
