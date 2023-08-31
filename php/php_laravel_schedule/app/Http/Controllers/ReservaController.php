<?php

namespace App\Http\Controllers;
use App\User as User;
use Illuminate\Support\Collection;
use App\Traits\hasDependencies;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Traits\ValidatesForm;

class ReservaController extends Controller
{
    use hasDependencies,
        ValidatesForm;

    private $consult;

    protected $model = '\\App\\Models\\Reserva';

    protected static $dependencies = [
        'list' => [
            'reservas'              =>  'group',
            'horarios'              =>	'key',
            'estado'                =>  false,
            'reservas.ubicacion'    =>  false,
            'reservas.evento'       =>  false,
            'reservas.evento.estado'=>  false,
            'reservas.promocion'    =>  false,
            'intervalo'             =>  false
        ],
        'add' => [
            'horarios'				=>	'key',
            'feriados'              =>  'key',
            'ubicaciones' 			=>  'all',
            'feriados.eventos'      =>  false,
            'horarios.eventos'		=>	false,
            'feriados.eventos.promociones' => false,
            'horarios.eventos.promociones' => false,
            'intervalo' 			=> false
        ],
        'single' => [
            'reservas'           => false,
            'reservas.ubicacion' => false,
            'reservas.evento'    => false,
            'reservas.promocion' => false,
            'reservas.estado'    => false
        ],
        'all' => [
            'reservas'              =>  'group',
            'reservas.ubicacion'    =>  false,
            'reservas.evento'       =>  false,
            'reservas.evento.estado'=>  false,
            'reservas.promocion'    =>  false,
        ]
    ];

    public function __construct () {
        $this->consult = "App\\Local";
        $this->middleware('length');
    }

    public function getRedirect($id){
        return ['dir' => "/reservas/$id", 'route' => 'reservas'];
    }

    public function list (
        $route,
        $id,
        $month,
        $year
    ){
        return response (
            $this->getData( (object) [
                "depends" => self::getDependencies($route),
                "scope" => array(
                    'reservas' => (object) [
                        'month'=>$month,
                        'operator'=>'=',
                        'year'=>$year,
                        'scope'=>'thisMonth'
                    ]
                ),
                "model" => $this->consult,
                "extra" => array(
                    'intervalo' => "intervalo",
                    'antelacion' => "antelacion_reserva"
                ),
                "uid" => $id
            ]),
            200
        )->header('Content-Type','application/json');
    }

    public function all(
        $id,
        $route
    ){
        return response (
            $this->getData( (object) [
                "depends" => self::getDependencies($route),
                "scope" => array(),
                "model" => $this->consult,
                "extra" => array(),
                "uid" => $id
            ]),
            200
        )->header('Content-Type','application/json');
    }

    public function add(
        $route,
        $id,
        $month,
        $year
    ){
        return response (
            $this->getData( (object) [
                "depends" => self::getDependencies($route),
                "scope" => array(
                    'feriados' => (object) [
                        'month'=>$month,
                        'operator'=>'=',
                        'year'=>$year,
                        'scope'=>'thisMonth'
                    ]
                ),
                "model" => $this->consult,
                "extra" => array(
                    'intervalo' => "intervalo",
                    'antelacion' => "antelacion_reserva"
                ),
                "uid" => $id
            ]),
            200
        )->header('Content-Type','application/json');
    }

    public function single(
        $route,
        $uId,
        $id
    ){
        return response (
            $this->getData( (object) [
                "depends" => self::getDependencies($route),
                "scope" => array(
                    'reservas' => (object)[
                        'id'=>$id,
                        'scope'=>'searchId'
                    ]
                ),
                "model" => $this->consult,
                "extra" => array(),
                "uid" => $uId
            ]),
            200
        )->header('Content-Type','application/json');
    }

    public function create (Request $request){
        $request->merge([
            'validationType' => 'EditAdd',
            'requestType' => 'POST'
        ]);
        return $this->applyValidation($request);
    }

    public function update (Request $request){
        $request->merge([
            'validationType' => 'StatusUpdate',
            'requestType' => 'PUT'
        ]);
        return $this->applyValidation($request);
    }

    public function delete (){
        return response(['respuesta'=>'delete'],200)
            ->header('Content-Type','application/json');
    }
}
