<?php


namespace App\Helper;


class StringHelper
{
    private $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";

    public function randomString( int $length ) : string
    {
        $size = strlen( $this->chars );
        $str = "";
        for( $i = 0; $i < $length; $i++ )
        {
            $str.= $this->chars[ rand( 0, $size - 1 ) ];
        }
        return $str;
    }

}