<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Resources\FeriadosResource as Resource;
use App\Traits\hasDependencies;
use Illuminate\Http\Request;
use App\Traits\ValidatesForm;

class FeriadoController extends Controller
{
    use hasDependencies,
        ValidatesForm;

    protected $model = '\\App\\Models\\Feriado';

    private $consult;

    protected static $dependencies = [
        'list' => [
            'feriados'          =>	'key',
            'intervalo'         => false,
            'feriados.eventos'  =>  false
        ],
        'add' => [
            'feriados' => 'list',
            'eventos'=>	'all',
            'intervalo' => false
        ],
        'single' => [
            'feriados'           => false,
            'feriados.eventos'   => false,
            'intervalo'          => false,
            'eventos'            => 'all'
        ],
        'all' => [
            'feriados'          =>	'key',
            'intervalo'         => false,
            'feriados.eventos'  =>  false
        ]
    ];

    public function __construct (){
        $this->consult = "App\\Local";
        $this->middleware('length');
    }

    public function getRedirect($id){
        return ['dir' => "/feriados/$id", 'route' => 'feriados'];
    }
    /**
     * get all eventos by user
     *
     * @param $id must be an integer in db
     */
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
                    'feriados' => (object) [
                        'month'=>$month,
                        'operator'=>'=',
                        'year'=>$year,
                        'scope'=>'thisMonth'
                    ]
                ),
                "model" => $this->consult,
                "extra" => array(
                    'intervalo' => "intervalo"
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

    /**
     * this function assigns dependencies and it corresponding callbacks
     * @param dependencies is an associative array with Reservas dependencies to be eagerly loaded
     * @param parameters is an associative array with values passed to eager load constructor
     */
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
                    'feriados' => (object)[
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
            'scope'=>1,
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

    public function modifyScope (Request $request) {
        $request->merge([
            'validationType' => 'ScopeUpdate',
            'requestType'=>'PUT'
        ]);
        return $this->applyValidation($request);
    }

    public function delete (){
        return response(['respuesta'=>'delete'],200)
            ->header('Content-Type','application/json');
    }
}
