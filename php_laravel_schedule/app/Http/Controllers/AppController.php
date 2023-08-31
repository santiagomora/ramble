<?php

namespace App\Http\Controllers;

use App\Local;
use Illuminate\Http\Request;
use App\Http\Resources\LocalesResource;

class AppController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth')->only('index');
    }

    public function escritorio( Request  $request ) {
        $user = json_encode([
            'data'=> new LocalesResource(
                Local::where('id',27)->first()
            )
        ]);
        return response(200,["user"=>$user]);
    }

    public function reservas()
    {
        return response(200,["reserva"=>"reserva"]);
    }

    public function base( Request  $request ){
        $user = json_encode([
            'data'=> new LocalesResource(
                Local::where('id',27)->first()
            )
        ]);
        return view('app',compact('user'));
    }
}
