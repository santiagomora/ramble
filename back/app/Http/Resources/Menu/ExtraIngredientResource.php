<?php

namespace App\Http\Resources\Menu;

use Illuminate\Http\Resources\Json\JsonResource;

class ExtraIngredientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request){
        return [
            "id" => $this->ext_id,
            "category" => $this->category,
            "description" => $this->ext_description,
            "name" => $this->ext_name,
            "price"=>$this->ext_price
        ];
    }
}
