<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * 
 *  @class: requestInjection
 * 
 *  @purpose: to perform any actions that are required for the user to authorized or authenticated
 *             this is a middleware that is used to inject the request object into the controller Request object
 * 
 */

 
class requestInjection
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        return $next($request);
    }
}
