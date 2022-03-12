<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Http\Resources\Shop\ShopResource;
use \App\Http\Resources\Shop\ShopWithStatsResource;
use \App\Shop;
use Illuminate\Support\Facades\DB;

class ShopController extends Controller
{
    public function __construct(){

    }

    public function getShop( $shop_id ){
        $shop = Shop::where( "sho_id",$shop_id )->first();
        return response(
            new ShopResource( $shop ),
            200
        );
    }

    public function getShopList(){
        $shops = DB::select(
            "select s1.*,m1.cat_description,avg(m1.men_base_price) as avg,count(*) as cnt
            from shops s1 join (
                select * from menu m2
                join categories c1
                on m2.men_category = c1.cat_id
            ) m1
            on sho_id = men_shop
            group by m1.men_category,s1.sho_id,m1.cat_description"
        );
        //p
        return response(
            ShopWithStatsResource::collection(
                collect( $shops )->groupBy("sho_id")
            ),
            200
        );
    }

    public function getRates(){
        return response([
            'rates'=>[
                'USD' => 1.2,
                'EUR' => 1
            ]
        ],200);
    }
}
