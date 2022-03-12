<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Http\Resources\Shop\ShopMenuResource;
use \App\Shop;

class MenuController extends Controller
{
    public function __construct(){
    }

    public function getMenu( $shop_id ){
        $shop = Shop::
            with([
                'currency',
                'categories',
                'categories.menu' => function($query) use ($shop_id) {
                    return $query->where('men_shop',$shop_id);
                },
                'categories.menu.variations',
                'categories.menu.category',
                'categories.extras'=>function($query) use ($shop_id) {
                    return $query->where('ext_shop',$shop_id);
                },
            ])
            ->where( "sho_id",$shop_id )
            ->first();
        return response( new ShopMenuResource($shop),200);
    }
}
