<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\EventosResource as Resource;
use App\Traits\hasDependencies;
use App\Traits\ValidatesForm;
use Carbon\Carbon;
use App\User;

class EventoController extends Controller
{
    use hasDependencies,
        ValidatesForm;

    protected $model = '\\App\\Models\\Evento';

    private $consult;

    public function getRedirect($id){
        return ['dir' => "/eventos/$id", 'route' => 'eventos'];
    }

    public function __construct () {
        $this->consult = "App\\Local";
        $this->middleware('length');
    }

    protected static $dependencies = [
        'list' => [
            'eventos'               => 'key',
            'eventos.horarios'      => false,
            'eventos.promociones'   => false
        ],
        'add' => [
            'feriados'              => 'key',
            'promociones'           => 'list',
            'horarios'              => 'list'
        ],
        'single' => [
            'eventos'               => false,
            'eventos.feriados'      => false,
            'eventos.horarios'      => false,
            'eventos.promociones'   => false,
            'feriados'              => 'key',
            'horarios'              => 'list',
            'promociones'           => 'list',
        ],
    ];

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

    public function add (
        $route,
        $id
    ){
        return response (
            $this->getData( (object) [
                "depends" => self::getDependencies($route),
                "scope" => array(
                    'feriados' => (object) [
                        'date' => new \DateTime(),
                        'operator'=>'>=',
                        'scope'=>'thisDate'
                    ]
                ),
                "model" => $this->consult,
                "extra" => array(),
                "uid" => $id
            ]),
            200
        )->header('Content-Type','application/json');
    }

    public function single (
        $route,
        $uId,
        $id
    ){
        $feriadoScope = (object) [
            'date' => new \DateTime(),
            'operator'=>'>=',
            'scope'=>'thisDate'
        ];
        return response (
            $this->getData( (object) [
                "depends" => self::getDependencies($route),
                "scope" => array(
                    'eventos' => (object) [
                        'id'=>$id,
                        'scope'=>'searchId'
                    ],
                    'eventos.feriados' => $feriadoScope,
                    'feriados' => $feriadoScope
                ),
                "model" => $this->consult,
                "extra" => array(),
                "uid" => $uId
            ]),
            200
        )->header('Content-Type','application/json');
    }

    public function create(Request $request){
        $request->merge([
            'validationType' => 'EditAdd',
            'requestType' => 'POST',
            'scope'=>1
        ]);
        return $this->applyValidation($request);
    }

    public function update(Request $request){
        $request->merge([
            'validationType' => 'EditAdd',
            'requestType' => 'PUT',
        ]);
        return $this->applyValidation($request);
    }

    public function modifyScope (Request $request) {
        $request->merge([
            'validationType' => 'ScopeUpdate',
            'requestType' => 'PUT',
        ]);
        return $this->applyValidation($request);
    }

    public function delete (){
        return response(['respuesta'=>'delete'],200)
            ->header('Content-Type','application/json');
    }
}
