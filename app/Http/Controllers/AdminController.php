<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Traits\hasDependencies;
use Illuminate\Support\Collection;
use App\Http\Resources\AdminsResource as Resource;
use App\Traits\ValidatesForm;
use Illuminate\Support\Facades\Hash;

use App\Admin;

class AdminController extends Controller
{
    use hasDependencies,
        ValidatesForm;

    protected $model = '\\App\\Admin';

    public function getRedirect($id){
        return ['dir' => '/configuracion', 'route' => 'configuracion'];
    }

    protected static $dependencies = [
        'list' => [],
        'single'=>[
            'administradores' => 'key',
            'franquicias' => 'key',
            'locales' => 'key'
        ]
    ];

    public function locales (
        $route,
        $id
    ){
        $dependencies = self::getDependencies($route);
        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array(
                'usuarios' => (object)[
                    'scope' => 'searchFranquicias'
                ]
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

    public function franquicias (
        $route,
        $id
    ){
        $dependencies = self::getDependencies($route);
        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array(
                'usuarios' => (object)[
                    'scope' => 'searchFranquicias'
                ]
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

    public function update(Request $request){
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
}
