<?php

namespace App\Http\Middleware;
use App\User;
use Illuminate\Support\Facades\Auth;

use Closure;

class CustomAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ( Auth::guard('api')->user() )
            return $next( $request );
        return response([
            'type'=>'failure',
            'title'=> "Error",
            'redirect'=>"/login",
            'route' => "login",
            'errors'=> [],
            'message' =>  "Usuario no autenticado, o sesión vencida.",
            'status' => 401
        ],401);
    }
}
