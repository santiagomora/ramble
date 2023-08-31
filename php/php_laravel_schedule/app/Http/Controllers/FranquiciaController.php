<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Traits\hasDependencies;
use Illuminate\Support\Collection;
use App\Models\Query\Provincia;
use App\Models\Query\Intervalo;
use App\Http\Resources\FranquiciasResource as Resource;
use App\Traits\ValidatesForm;
use App\Franquicia;
use Illuminate\Support\Facades\Hash;

class FranquiciaController extends Controller
{
    use hasDependencies,
        ValidatesForm;

    protected $model = '\\App\\Franquicia';

    public function getRedirect($id){
        return ['dir' => '/configuracion', 'route' => 'configuracion'];
    }

    private $consult;

    protected static $dependencies = [
        'list' => [],
        'add' => [
            'franquicias' => 'list'
        ],
        'locales'=>[
            'locales' => 'key',
            'intervalo' => false,
            'locales.franquicia' => false,
            'locales.administrador'=>false
        ],
        'franquicia' => [
            'franquicia.locales' => false,
            'franquicia.administrador'=>false
        ],
    ];

    public function __construct () {
        $this->consult = "App\\Admin";
        $this->middleware('length');
    }

    public function single (
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

    public function locales(
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
}
