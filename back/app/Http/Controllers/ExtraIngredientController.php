<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\ExtraIngredient;
use \App\Http\Resources\Extras\ExtraIngredientResource;

class ExtraIngredientController extends Controller
{
    public function __construct(){

    }
    public function getList( $shop_id,$cat_id ){
        $ext = ExtraIngredient::
            where( "ext_shop",$shop_id )
            ->where( "ext_category_id",$cat_id )
            ->get();
        return response(
            ExtraIngredientResource::collection( $ext ),
            200
        );
    }
}
