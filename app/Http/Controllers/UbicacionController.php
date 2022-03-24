<?php

namespace App\Http\Controllers;

use App\Http\Resources\UbicacionesResource as Resource;
use App\Traits\hasDependencies;
use Illuminate\Http\Request;
use App\User;
use App\Traits\ValidatesForm;

class UbicacionController extends Controller
{
    use hasDependencies,
        ValidatesForm;

    protected $model = '\\App\\Models\\Ubicacion';

    private $consult;

    protected static $dependencies = [
        'list' => [
            'ubicaciones'           => 'key',
            'ubicaciones.estado'    => false
        ],
        'add' => [],
        'single' => [
            'ubicaciones' => false
        ]
    ];

    public function __construct () {
        $this->consult = "App\\Local";
        $this->middleware('length');
    }

    public function getRedirect($id){
        return ['dir' => "/ubicaciones/$id", 'route' => 'ubicaciones'];
    }

    public function list ($route,$id){
        //dd(csrf_token());
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

    public function single (
        $route,
        $uId,
        $id
    ){
        return response (
            $this->getData( (object) [
                "depends" => self::getDependencies($route),
                "scope" => array(
                    'ubicaciones' => (object)[
                        'id'=>$id,
                        'scope' => 'searchId'
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
            'requestType' => 'POST',
            'scope' => 1
        ]);
        return $this->applyValidation($request);
    }

    public function update (Request $request){
        $request->merge([
            'validationType' => 'EditAdd',
            'requestType' => 'PUT'
        ]);
        return $this->applyValidation($request);
    }

    public function modifyScope (Request $request) {
        $request->merge([
            'validationType' => 'ScopeUpdate',
            'requestType' => 'PUT'
        ]);
        return $this->applyValidation($request);
    }

    public function delete (){
        return response(['respuesta'=>'delete'],200)
            ->header('Content-Type','application/json');
    }
}
