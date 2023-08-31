<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Traits\hasDependencies;
use Illuminate\Support\Collection;
use App\Models\Query\Provincia;
use App\Models\Query\Intervalo;
use App\Http\Resources\UsuariosResource as Resource;
use App\Traits\ValidatesForm;
use App\User;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    use hasDependencies,
        ValidatesForm;

    protected $model = '\\App\\User';

    public function getRedirect($id){
        return ['dir' => '/configuracion', 'route' => 'configuracion'];
    }

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
        'franquicias'=>[
            'usuarios' => 'key',
            'intervalo' => false,
            'franquicia.administrador'=>false
        ]
    ];

    public function __construct () {
        $this->middleware('length');
    }

    public function add (
        $route,
        $id,
        $role
    ){
        $dependencies = self::getDependencies($route);
        $scope = $role != 1
        ?
            (object)[
                'id' => $id,
                'scope'=>'searchId'
            ]
        :
            (object)[
                'scope' => 'searchFranquicias'
            ];
        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array(
                'usuarios' => $scope
            )
        );
        $user = User::with(
            $relations
        )->find($id);

        $data = self::formatResults(
            $user,
            $dependencies
        );

        return response($data,200)->header('Content-Type','application/json');
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

    public function updateUsuario (Request $request){
        $data = $request->post();
        $merge = [
            'validationType' => 'Usuario',
            'validationTitle'=> 'Local',
            'requestType' => 'PUT',
        ];
        if ($data['password']){
            $merge['password'] = Hash::make($data['password']);
        }
        $request->merge($merge);
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
