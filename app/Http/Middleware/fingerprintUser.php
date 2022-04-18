<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\user_fingerprint;

class fingerprintUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */

    public function handle(Request $request, Closure $next)
    {
        $finger = new user_fingerprint();
        // record the user fingerprint.
        // inorder for us to track the user activity.
        // and query and analyze data if there is any suspicious activity.
        $finger->add(
            $request->ip(),
            $request->header('User-Agent'),
            $request->header('Time'),
            $request->header->all(),
            $request->header('Request-Type'),
            $request->header('Signature'),
            $request->header('Session-Token')
        );


        return $next($request);
    }
}
