<?php

namespace App\Http\Resources\Orders;

use Illuminate\Http\Resources\Json\JsonResource;
use \App\Http\Resources\Orders\OrderItemsResource;

class OrderResource extends JsonResource
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
            "ord_id" => $this->ord_id,
            "ord_shop" => $this->shop->sho_name,
            "ord_observations" => $this->ord_observations,
            "ord_cli_address" => $this->ord_cli_address,
            "ord_cli_telephone" => $this->ord_cli_telephone,
            "ord_cli_name" =>  $this->ord_cli_name,
            "ord_date" => date("d/m/Y H:m", strtotime($this->ord_date)),
            "ord_total" => $this->ord_total,
            "ord_currency"=> $this->currency->curr_name,
            "ord_cli_email"=> $this->ord_cli_email,
            "ord_shop_currency"=> $this->shop_currency->curr_name,
            "ord_shipping" => $this->ord_shipping,
            "ord_conversion" => $this->ord_conversion,
            "ord_status" => $this->status->sta_name,
            "items" => OrderItemsResource::collection( $this->menu )
        ];
    }
}
