<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Traits\hasDependencies;
use Illuminate\Support\Collection;
use App\Models\Query\Provincia;
use App\Models\Query\Intervalo;
use App\Http\Resources\LocalesResource as Resource;
use App\Traits\ValidatesForm;
use App\Local;
use Illuminate\Support\Facades\Hash;

class LocalController extends Controller
{
    use hasDependencies,
        ValidatesForm;

    protected $model = '\\App\\Local';

    private $consult;

    protected static $dependencies = [
        'list' => [],
        'add' => [
            'usuarios' => 'list'
        ],
        'local' => [
            'provincia' => false,
            'intervalo' => false,
            'locales.franquicia' => false,
            'locales.administrador'=>false
        ]
    ];

    public function __construct () {
        $this->consult = "App\\Franquicia";
        $this->middleware('length');
    }

    public function getRedirect($id){
        return ['dir' => '/configuracion', 'route' => 'configuracion'];
    }

    public function single(
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

    public function create (Request $request){
        $merge = [
            'validationType' => 'EditAdd',
            'validationTitle'=> 'Local',
            'requestType' => 'POST',
            'scope' => 1
        ];
        $data = $request->post();
        if ($data['password']){
            $merge['password'] = Hash::make($data['password']);
        }
        $request->merge($merge);
        return $this->applyValidation($request);
    }

    public function updateReservas (Request $request){
        $request->merge([
            'validationType' => 'Reservas',
            'validationTitle'=> 'Local',
            'requestType' => 'PUT',
        ]);
        return $this->applyValidation($request);
    }

    public function updateEstablecimiento (Request $request){
        $request->merge([
            'validationType' => 'Establecimiento',
            'validationTitle'=> 'Local',
            'requestType' => 'PUT',
        ]);
        return $this->applyValidation($request);
    }
}
