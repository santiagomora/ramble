<?php

namespace App\Traits;

use Illuminate\Support\Facades\Hash;

trait CustomAuthMethods {

    public static function getCredentialName(){
        return self::$credentialName;
    }

    public static function getTokenName(){
        return self::$tokenName;
    }

    public static function retrieveUserByCredentials( $credentials ){
        $credName = self::getCredentialName();
        return ( !is_null( $user = self::where( $credName,$credentials )->first() ) )
            ? $user
            : null;
    }

    public static function retrieveUserByToken( $token ){
        $tokenName = self::getTokenName();
        return ( !is_null( $user = self::where( $tokenName,$value )->first() ) )
            ? $user
            : null;
    }

    public function validatePassword( $pass ){
        return Hash::check( $pass,$this->getAuthPassword() ) == 1;
    }

}
