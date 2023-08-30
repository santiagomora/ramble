<?php

namespace App\Http\Resources\Shop;

use Illuminate\Http\Resources\Json\JsonResource;
use \App\Models\Variation;

class ShopWithStatsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function getDataFormat($data){
        return [
            "id"=>$data->sho_id,
            "name"=>$data->sho_name,
            "email"=>$data->sho_email,
            "pic"=>$data->sho_pic,
            "currency"=>$data->sho_base_currency,
            "description"=>$data->sho_description,
            "shipping" => $data->sho_shipping
        ];
    }

    public function getStatFormat($stat){
        return [
            "avg" => $stat->avg,
            "cnt" => $stat->cnt
        ];
    }

    public function formatBeforeSend($data){
        $res = $this->getDataFormat($data[0]);
        foreach($data as $key=>$d){
            $catName = $d->cat_description;
            $res["stats"][$catName] = $this->getStatFormat($d);
        }
        return $res;
    }

    protected $preserveKeys = true;

    public function toArray($request) {
        return $this->formatBeforeSend( $this->resource );
    }
}
