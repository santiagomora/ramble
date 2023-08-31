<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CuadroResource extends JsonResource
{
    private function getFields() {
        return [
            "id" => function () { return ['id'=>$this->id]; },
            "titulo" => function () { return ['titulo'=>$this->titulo]; },
            "fecha" => function () { return ['fecha'=>$this->fecha]; },
            "descripcion"=> function () { return ['descripcion'=>$this->descripcion]; },
            "id_dueno" => function () { return ['dueno' =>$this->dueno->nombre]; },
            "id_autor" => function () { return ['autor'=>$this->autor->nombre]; } ,
            "id_corriente" => function() {return ['categoria'=>$this->corriente->nombre.": ".$this->corriente->descripcion];},
            "id_museo" => function() {return ['museo' => $this->museo->nombre];}
        ];
    }

    public function toArray($request)
    {
        $fields = $this->getFields();
        $formatted = [];
        foreach( $fields as $fieldName=>$fieldExpr )
        {
            if(isset($this[$fieldName]))
            {
                $formatted = array_merge( $formatted,$fieldExpr() );
            }
        }
        return $formatted;
    }
}