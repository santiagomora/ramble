<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use App\Traits\hasDependencies;
use App\Models\Horario;

class HorarioResource extends JsonResource
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
        'reservas.list' => [],
        'reservas.all' => [],
        'horarios.list' => [
            'eventos' => 'list'
        ],
        'horarios.add' => [],
        'horarios.single' => [
            'eventos' => 'all'
        ],
        'promociones.single' => [],
        'search' => []
    ];
    public $preserveKeys = true;
    public function toArray($request)
    {
        $data = [
            "id"=>$this->id,
            "diaSemana"=>$this->id_dia_semana,
            "id_usuario" => $this->id_usuario,
            "estado"=>$this->estado->descripcion,
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
