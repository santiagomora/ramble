<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Traits\hasDependencies;

class AdminsResource extends JsonResource
{
    use hasDependencies;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private static $dependencies = [
        'base' => [],
        'auth.login' => [
            'usuario' => false
        ],
        'auth.retrieve' => [
            'usuario' => false
        ],
        'admin.update'=>[
            'usuario' => false
        ],
        'admin.locales' => [],
        'admin.franquicias' => [],
        'escritorio' => [
            'usuario'=>false
        ]
    ];

    public $preserveKeys = true;

    public function toArray($request)
    {
        $admin = $this;
        $dependencies = self::getDependencies($request->route()->action['as']);
        $data = [
            'id'=>$admin->id,
            'nombre' => $admin->nombre,
            'correoContacto'=> $admin->correo_contacto,
            'telefonoContacto'=> $admin->telefono_contacto,
            'razonSocial'=> $admin->razon_social,
            'cuitCuil'=> $admin->cuit_cuil,
            'prefix'=>'admins'
        ];
        $dependencyData = self::formatResults(
            $admin,
            $dependencies
        );
        return array_merge($data,$dependencyData);
    }
}
