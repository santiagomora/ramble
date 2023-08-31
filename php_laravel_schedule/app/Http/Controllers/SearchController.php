<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public $modelMapping = [
        'reservas'      => 'App\\Models\\Reserva',
        'horarios'      => 'App\\Models\\Horario',
        'feriados'      => 'App\\Models\\Feriado',
        'ubicaciones'   => 'App\\Models\\Ubicacion',
        'eventos'       => 'App\\Models\\Evento',
        'promociones'   => 'App\\Models\\Promocion'
    ];

    public function __construct(){

    }

    public function search($route,$user){

        $model = $this->modelMapping[$route];
        $query = $model::where('id_usuario',$user);
        $resource = $model::getResource();

        return call_user_func_array(
			"$resource::collection",
			[$query->get()]
		);
    }
}
