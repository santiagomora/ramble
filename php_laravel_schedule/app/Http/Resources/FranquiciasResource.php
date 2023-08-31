<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Traits\hasDependencies;

class FranquiciasResource extends JsonResource
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
        'franquicia.locales' => [],
        'franquicia.franquicias'=>[
            'locales' => 'key'
        ],
        'franquicia.add'=>[],
        'franquicia.local'=>[],
        'franquicia.franquicia'=>[],
        'auth.login' => [
            'administrador'=>false,
            'usuario'=>false
        ],
        'auth.retrieve' => [
            'administrador'=>false,
            'usuario'=>false
        ]
    ];

    public $preserveKeys = true;

    public function toArray($request)
    {
        $dependencies = self::getDependencies($request->route()->action['as']);
        $data = [
            'id'=>$this->id,
            'nombre' => $this->nombre,
            'correoContacto'=> $this->correo_contacto,
            'telefonoContacto'=> $this->telefono_contacto,
            'razonSocial'=> $this->razon_social,
            'cuitCuil'=> $this->cuit_cuil,
            'direccion'=> $this->direccion,
            'direccionLocal'=> $this->direccion,
            'prefix'=>'franquicias'
        ];
        $dependencyData = self::formatResults(
            $this->resource,
            $dependencies
        );
        return array_merge($data,$dependencyData);
    }
}
