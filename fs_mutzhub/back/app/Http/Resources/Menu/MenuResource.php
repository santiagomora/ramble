<?php

namespace App\Http\Resources\Menu;

use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request) {
        return [
            "id"=>$this->men_id,
            "name"=>$this->men_name,
            "description"=>$this->men_description,
            "pic"=>$this->men_picture,
            "base_price"=>$this->men_base_price,
            "category" => $this->category->cat_description,
            "variations"=>$this->variations->groupBy('var_type')
        ];
    }
}
