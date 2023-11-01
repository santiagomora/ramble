<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ClientController extends Controller {

    public function __construct(){
    }

    function updateUser( Request $request ){
        $data = $request->post();
        $auth = $data['user'];
        if ( $auth->cli_id === $data['cli_id'] ){
            if( isset( $data['cli_password'] ) )
                $data['cli_password'] = Hash::make( $data['cli_password'] );
            $auth->update($data);
            $msg = [
                'msg' => 'Your data has ben updated successfully',
                'success' => true
            ];
        } else $msg = [
            'msg' => 'An error has occurred while updating your data',
            'success' => false
        ];
        return response($msg,200);
    }
}
