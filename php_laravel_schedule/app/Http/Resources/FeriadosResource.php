<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use App\Traits\hasDependencies;

class FeriadosResource extends JsonResource
{
    use hasDependencies;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */

    private static $dependencies = [
        'reservas.add' => [
            'eventos' => 'all'
        ],
        'feriados.all' => [
            'eventos' => 'list'
        ],
        'feriados.list'=>[
            'eventos' => 'list'
        ],
        'eventos.single' => [],
        'eventos.add' => [],
        'feriados.single'=>[
            'eventos' => 'all'
        ],
        'search' => []
    ];

    public function toArray($request)
    {
        $d = $this->resource->getAttributes()['fecha_feriado'];
        $dI = strtotime($d);
        $data = [
            "id"=>$this->id,
            "id_usuario" => $this->id_usuario,
            "nombre"=>$this->nombre,
            "estado"=>$this->estado->descripcion,
            "scope"=>$this->scopeName->descripcion,
            "descripcion"=>$this->descripcion,
            "fecha" => date('Y-m-d H:i:s',$dI),
            "apertura" => [
                "reserva" => [
                    "hora" => $this->apertura_reserva->hora,
                    "minuto" => $this->apertura_reserva->minuto
                ],
                "atencion"=> [
                    "hora"=>$this->apertura_atencion->hora,
                    "minuto"=> $this->apertura_atencion->minuto
                ]
            ],
            "cierre" => [
                "reserva" => [
                    "hora" => $this->cierre_reserva->hora,
                    "minuto" => $this->cierre_reserva->minuto
                ],
                "atencion"=> [
                    "hora"=>$this->cierre_atencion->hora,
                    "minuto"=>$this->cierre_atencion->minuto
                ]
            ]
        ];
        $dependencies = self::getDependencies($request->route()->action['as']);
        $dependencyData = self::formatResults(
            $this->resource,
            $dependencies
        );
        return array_merge($data,$dependencyData);
    }
}
