<?php

namespace App\Http\Resources\Orders;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderExtraResource extends JsonResource
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
            "ext_name" => $this->ext_name,
            "ext_description" => $this->ext_description,
            "ext_price"=>$this->ext_price,
        ];
    }
}
