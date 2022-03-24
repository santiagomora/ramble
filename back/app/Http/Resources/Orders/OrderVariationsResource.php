<?php

namespace App\Http\Resources\Orders;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderVariationsResource extends JsonResource
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
            "var_name" => $this->var_name,
            "var_description" => $this->var_description,
            "var_type" => $this->var_type,
            "var_price" => $this->var_price,
            "var_currency" => $this->variation
        ];
    }
}
