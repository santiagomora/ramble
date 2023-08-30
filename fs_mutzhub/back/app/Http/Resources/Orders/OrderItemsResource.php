<?php

namespace App\Http\Resources\Orders;

use Illuminate\Http\Resources\Json\JsonResource;
use \App\Http\Resources\Orders\OrderExtraResource;
use \App\Http\Resources\Orders\OrderVariationsResource;

class OrderItemsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $menu = $this->menu;
        return ( $request->with_extra )
            ? [
                "name" => $menu->men_name,
                "description" => $menu->men_description,
                "om_quantity" => $this->om_quantity,
                "men_picture" => $menu->men_picture,
                "om_price" => $this->om_price,
                "om_currency" => $this->om_currency,
                "variations" => OrderVariationsResource::collection($this->variations),
                "extras" => OrderExtraResource::collection($this->extras)
            ] : [
                "men_picture" => $menu->men_picture,
                "name" => $menu->men_name,
                "description" => $menu->men_description,
                "om_quantity" => $this->om_quantity,
                "om_price" => $this->om_price,
                "om_currency" => $this->om_currency
            ];
    }
}
