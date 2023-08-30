<?php

namespace App\Http\Middleware\Custom;

use App\User;
use Illuminate\Support\Facades\Auth;

use Closure;
use Illuminate\Support\Facades\Cookie;

class CustomAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function evalUser(){
        if( !is_null( $user = Auth::guard('clients')->user() ) )
            return $user;
        return Auth::guard('shops')->user();
    }

    public function handle($request, Closure $next){
        if( !is_null( $user = $this->evalUser() ) ){
            $request->merge(['user'=>$user]);
            return $next( $request );
        }
        return response(['user' =>  null],200);
    }
}
