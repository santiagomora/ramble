<?php

namespace App\Services\Auth;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use phpDocumentor\Reflection\Types\Array_;
use Illuminate\Contracts\Auth\Authenticatable;

use Illuminate\Contracts\Auth\UserProvider;

class CustomGuard implements Guard {

    protected $provider;
    protected $user;

    /**
    * Create a new authentication guard.
    *
    * @param  \Illuminate\Contracts\Auth\UserProvider  $provider
    * @param  \Illuminate\Http\Request  $request
    * @return void
    */
    public function __construct(UserProvider $provider) {
        $this->provider = $provider;
        $this->user = NULL;
    }

    /**
    * Get the currently authenticated user.
    *
    * @return \Illuminate\Contracts\Auth\Authenticatable|null
    */
    public function user(){
        $cookie = request()->cookie("Authorization");
        if( !is_null( $cookie ) ){
            $model = $this->provider->getModel();
            $token = explode( " ", $cookie );
            return $model::where( $model::getTokenName() ,array_pop( $token ) )->first();
        }
        return NULL;
    }

    /**
    * Determine if the current user is authenticated.
    *
    * @return bool
    */
    public function check() {
        return ! is_null($this->user());
    }

    /**
    * Determine if the current user is a guest.
    *
    * @return bool
    */
    public function guest() {
        return ! $this->check();
    }
    /**
    * Get the ID for the currently authenticated user.
    *
    * @return string|null
    */
    public function id() {
        if ( $user = $this->user() ) {
            return $this->user()->getAuthIdentifier();
        }
    }

    /**
    * Set the current user.
    *
    * @param  Array $user User info
    * @return void
    */
    public function setUser(Authenticatable $user) {
        $this->user = $user;
        return $this;
    }

    /**
    * Validate a user's credentials.
    *
    * @return bool
    */
    public function validate(Array $credentials=[])
    {
        $model = $this->provider->getModel();

        if (empty($credentials["email"]) || empty($credentials["password"])) {
            return null;
        }

        $user = $model::retrieveUserByCredentials( $credentials["email"] );

        if (! is_null($user) && $user->validatePassword( $credentials["password"] ) ) {
            return $user;
        } else
            return null;
    }
}
