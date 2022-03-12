<?php

namespace App\Http\Middleware\Custom;

use Closure;

class CorsHeaders {
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    private function getAllowed(){
	return 'http://127.0.0.1:3000';
        return env( "DEPLOY","production" ) === "development"
            ? 'http://127.0.0.1:3000'
            : 'https://mutz-hub.herokuapp.com';
    }

    public function handle($request, Closure $next)
    {
        return $next($request)
            ->header('Content-Type','application/json')
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Access-Control-Allow-Origin', $this->getAllowed() )
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
            ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
    }
}
