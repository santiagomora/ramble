<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Traits\hasDependencies;

class LocalesResource extends JsonResource
{
    use hasDependencies;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private static $dependencies = [
        // 'locales.add'=>[],
        // 'locales.local'=>[
        //     'franquicia'=>false
        // ],
        // 'locales.locales'=>[],
        // 'locales.franquicia'=>[
        //     'locales' => 'key'
        // ],
        // 'locales.franquicias'=>[],
        'base' => [],
        'auth.login' => [
            'administrador'=>false,
            'franquicia'=>false,
            'usuario'=>false
        ],
        'auth.retrieve' => [
            'administrador'=>false,
            'franquicia'=>false,
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
            'admEmail'=> $this->correo_adm,
            'admNombre'=> $this->nombre_adm,
            'admTelefono'=> $this->telefono_adm,
            'correoContacto'=> $this->correo_contacto,
            'telefonoContacto'=> $this->telefono_contacto,
            'razonSocial'=> $this->razon_social,
            'cuitCuil'=> $this->cuit_cuil,
            'provincia'=> $this->provincia,
            'direccionLocal'=> $this->direccion,
            'intervalo'=> $this->intervalo,
            'caida'=> $this->caida_reserva,
            'antelacionReserva'=> $this->antelacion_reserva,
            'disponiblidad'=> $this->disponibilidad_reserva,
            'prefix'=>'locales'
        ];
        $dependencyData = self::formatResults(
            $this->resource,
            $dependencies
        );
        return array_merge($data,$dependencyData);
    }
}
