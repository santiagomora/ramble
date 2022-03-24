<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UbicacionesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public $preserveKeys = true;
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "foto" => $this->foto,
            "id_usuario" => $this->id_usuario,
            "nombre" => $this->nombre,
            "descripcion" =>$this->descripcion,
            "capacidad" => $this->cantidad_maxima,
            "estado" => $this->estado->descripcion,
            "maximo" => $this->maximo_personas
        ];
    }
}
