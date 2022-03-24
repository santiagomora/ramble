<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UsuariosResource extends JsonResource
{
    public $preserveKeys = true;

    public function toArray($request)
    {
        return [
            'foto_perfil'=>$this->foto_perfil,
            'id'=>$this->id,
            'username' => $this->username,
            'email'=> $this->email,
            'rol' => $this->id_rol
        ];
    }
}
