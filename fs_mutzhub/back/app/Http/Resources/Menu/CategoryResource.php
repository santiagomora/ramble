<?php

namespace App\Http\Resources\Menu;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->cat_id,
            "description" => $this->cat_description,
            "picture" => $this->pivot->sc_category_picture,
            "menu" => MenuResource::collection( $this->menu ),
            "extras" => ExtraIngredientResource::collection($this->extras)
        ];
    }
}
