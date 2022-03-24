<?php

namespace App\Http\Resources\Shop;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Menu\CategoryResource;

class ShopMenuResource extends JsonResource
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
            "id"=>$this->sho_id,
            "name"=>$this->sho_name,
            "email"=>$this->sho_email,
            "pic"=>$this->sho_pic,
            "currency"=>$this->currency->curr_name,
            "description"=>$this->sho_description,
            "categories" => CategoryResource::collection($this->categories)
        ];
    }
}
