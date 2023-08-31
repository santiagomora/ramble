<?php

namespace App\Http\Controllers;

use App\Http\Resources\HorarioResource as Resource;
use App\Traits\hasDependencies;
use Illuminate\Http\Request;
use App\User;
use App\Traits\ValidatesForm;

class HorarioController extends Controller
{
    use hasDependencies,
        ValidatesForm;

    protected $model = '\\App\\Models\\Horario';

    private $consult;

    protected static $dependencies = [
        'list' => [
            'horarios'          =>	'key',
            'estado'            =>  false,
            'horarios.eventos'  =>  false
        ],
        'add' => [
            'eventos'           =>  'all',
            'intervalo'         =>  false
        ],
        'single' => [
            'horarios'           => false,
            'horarios.eventos'   => false,
            'eventos'            => 'list'
        ]
    ];

    public function __construct () {
        $this->consult = "App\\Local";
        $this->middleware('length');
    }

    public function getRedirect($id){
        return ['dir' => "/horarios/$id", 'route' => 'horarios'];
    }

    public function list (
        $route,
        $id
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

    /**
     * this function assigns dependencies and it corresponding callbacks
     * @param dependencies is an associative array with Reservas dependencies to be eagerly loaded
     * @param parameters is an associative array with values passed to eager load constructor
     */
    public function add(
        $route,
        $id
    ){
        return response (
            $this->getData( (object) [
                "depends" => self::getDependencies($route),
                "scope" => array(),
                "model" => $this->consult,
                "extra" => array(
                    'intervalo' => "intervalo"
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
                    'horarios' => (object)[
                        'id'=>$id,
                        'scope'=>'searchId'
                    ]
                ),
                "model" => $this->consult,
                "extra" => array(
                    'intervalo' => "intervalo"
                ),
                "uid" => $uId
            ]),
            200
        )->header('Content-Type','application/json');
    }

    public function create (Request $request){
        $request->merge([
            'validationType' => 'EditAdd',
            'requestType'=>'POST'
        ]);
        return $this->applyValidation($request);
    }

    public function update (Request $request){
        $request->merge([
            'validationType' => 'EditAdd',
            'requestType'=>'PUT'
        ]);
        return $this->applyValidation($request);
    }

    public function delete (){
        return response(['respuesta'=>'delete'],200)
            ->header('Content-Type','application/json');
    }
}
