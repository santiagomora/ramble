<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cookie;

class LoginController extends Controller {
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/escritorio';

    protected $guard;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        //$this->user = Auth::guard('api')->user();
    }

    private $userResource = [
         "Local" => "\\App\\Http\\Resources\\LocalesResource",
         "Franquicia" => "\\App\\Http\\Resources\\FranquiciaResource",
         "Admin" => "\\App\\Http\\Resources\\AdminResource"
    ];

    public function login( Request $request ){
        $credentials = $request->only('email', 'password');
        if ( Auth::attempt( $credentials ) ) {
            $user = auth()->user();
            $role = $user->rol->descripcion;
            $token = $user->api_token;
            $type = $user->{$role};
            cookie()->queue('Authorization', "Bearer $token", 10);
            return response([
                'type'=>'success',
                'title'=> "¡Sesión iniciada!",
                'redirect'=>"/escritorio",
                'route' => "escritorio",
                'errors'=> [],
                'message' => "Bienvenido, $type->nombre",
                "user"=> new $this->userResource[$role]($type),
                'status' => 200
            ],200);
        }

        return response([
            'type'=>'failure',
            'title'=> "Datos de acceso inválidos",
            'status' => 422,
            'errors'=> [
                "email"=>["Correo o contraseña invalidos"],
            ],
            'message' => ""
        ],422);
    }

    public function retrieve( Request $request ){
        if ( $request->hasCookie('Authorization') ){
            $user = Auth::guard('api')->user();
            $role = $user->rol->descripcion;
            return response([
                "user"=> new $this->userResource[$role]( $user->{$role} )
            ],200);
        }
        return response([
            'type'=>'error',
            'title'=> "Error",
            'redirect'=>"/login",
            'route' => "login",
            'errors'=> [],
            'message' =>  "No autenticado",
            'status' => 401
        ],401);
    }

    public function logout( Request $request ){
        if ($request->hasCookie('Authorization')){
            $user = Auth::guard('api')->user();
            $role = $user->rol->descripcion;
            $message =[
                'type'=>'success',
                'title'=> "¡Sesión finalizada!",
                'redirect'=>"/login",
                'route' => "login",
                'errors'=> [],
                'message' =>"Hasta luego, ".$user->{$role}->nombre,
                'status' => 200
            ];
            Cookie::queue(Cookie::forget('Authorization'));
            return response($message,200);
        }
        return response([
            'type'=>'error',
            'title'=> "Error",
            'redirect'=>"/login",
            'route' => "login",
            'errors'=> [],
            'message' =>  "No autenticado",
            'status' => 401
        ],401);
    }
}
