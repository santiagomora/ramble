<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\PromocionesResource as Resource;
use App\Traits\hasDependencies;
use Carbon\Carbon;
use App\User;
use App\Traits\ValidatesForm;

class PromocionController extends Controller
{
    use hasDependencies,
        ValidatesForm;

    protected $model = '\\App\\Models\\Promocion';

    private $consult;

    protected static $dependencies = [
        'list' => [
            'promociones'        => 'key',
            'promociones.eventos'=> false
        ],
        'add' => [
            'eventos'=> 'list'
        ],
        'single' => [
            'promociones' => false,
            'promociones.eventos'=> false,
            'eventos'=> 'list'
        ],
    ];

    public function __construct () {
        $this->consult = "App\\Local";
        $this->middleware('length');
    }

    public function getRedirect($id){
        return ['dir' => "/promociones/$id", 'route' => 'promociones'];
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

    public function add (
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

    public function single (
        $route,
        $uId,
        $id
    ){
        return response (
            $this->getData( (object) [
                "depends" => self::getDependencies($route),
                "scope" => array(
                    'promociones' => (object)[
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
        $request->request->add([
            'validationType' => 'EditAdd',
            'requestType' => 'POST',
            'scope'=>1
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
