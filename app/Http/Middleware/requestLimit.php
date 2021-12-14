<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * 
 *  @class: requestLimit (Middleware)
 * 
 * 
 *  @purpose: inorder to prevent mass requests, we can use this middleware
 */

class requestLimit
{

    private $requestCount = 0;
    private $requestLimit = 5;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

     
    public function handle(Request $request, Closure $next)
    {   

        // this will prevent mass request to the login page 
        // preventing brute force attacks

        if($this->requestCount < $this->requestLimit) {
            $this->requestCount++;
            return $next($request);
        }

        return response('Too Many Requests', 429);
    }
}
