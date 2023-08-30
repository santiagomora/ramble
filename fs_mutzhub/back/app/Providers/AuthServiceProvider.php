<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use \App\Client;
use \App\Services\Auth\CustomGuard;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Auth::extend('auth.custom', function ($app, $name, array $config) {
            return new CustomGuard(Auth::createUserProvider($config['provider']));
        });
        /*
        Auth::viaRequest('custom-token', function ($request) {
            $token = explode( " ", $request->cookie('Authorization') );
            return Client::where('cli_api_token',array_pop( $token ) )->first();
        });*/
    }
}
