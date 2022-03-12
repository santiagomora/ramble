<?php

namespace App\Http\Resources\Orders;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderMenuResource extends JsonResource
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
            "om_shop_id" => $this->om_shop_id,
            "om_menu_id" => $this->om_menu_id,
            "om_variation_id" => $this->om_variation_id,
            "om_quantity" => $this->om_quantity,
            "om_price" => $this->om_price,
            "om_currency" => $this->om_currency
        ];
    }
}
