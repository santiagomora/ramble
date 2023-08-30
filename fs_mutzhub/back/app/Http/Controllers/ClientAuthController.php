<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use \App\Client;

class ClientAuthController extends Controller {

    public function __construct(){
    }

    public function login(Request $request){
        $cred = $request->only("email","password");
        $res = [];
        if ( !is_null( $user = Auth::guard('clients')->validate( $cred ) ) ){
            $token = $user->cli_api_token;
            cookie()->queue( 'Authorization', "Bearer $token", 360000 );
            $res = [
                'msg' => "Bienvenido",
                "user"=> $user,
                'status' => 200
            ];
        } else
            $res = [ 'msg' => "invalid username or password",'status' => 401];
        return response($res,$res['status']);
    }

    public function retrieve( Request $request ){
        return response( $request->only("user"),200 );
    }

    public function register( Request $request ){
        $data = $request->post();
        $data['cli_password'] = Hash::make($data['cli_password']);
        $token  = Str::random(255);
        $data['cli_api_token'] = $token;
        $user = Client::create($data);
        cookie()->queue( 'Authorization', "Bearer $token", 360000 );
        return response (
            ["user"=>$user],
            200
        );
    }

    public function logout( Request $request ){
        $user = $request->only("user")["user"];
        if ( isset( $user ) ){
            $user->update(["cli_api_token" => Str::random(255)]);
            Cookie::queue(Cookie::forget('Authorization'));
            return response([
                'msg' =>"See you later",
                'status' => 200
            ],200);
        }
        return response([
            'msg' =>  "No autenticado",
            'status' => 401
        ],401);
    }
}
