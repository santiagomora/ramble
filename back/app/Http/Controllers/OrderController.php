<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Carbon\Carbon;
use \App\Traits\CastingMethods;
use \App\Models\Order;
use \App\Http\Resources\Orders\OrderResource;

class OrderController extends Controller {

    use CastingMethods;

    public function __construct(){
    }

    public function save( Request $request ){
        $data = $request->post();
        $items = $data["items"];
        $order = Order::create( Order::cast($data) );
        $this->saveMenu($items,$order);
        return response(
            ["msg" => "Your order was placed successfully"],
            200
        );
    }

    public function getOrders( $id ){
        $client = request()->only('user')['user'];
        $eagerload = [
            'orders',
            'orders.shop',
            'orders.currency'
        ];
        request()->merge(['with_extra' => false]);
        return response([
            "orders" => OrderResource::collection(
                $client->load($eagerload)->orders
            )],
            200
        );
    }

    public function getSingleOrder( $id ){
        $client = request()->only('user')['user'];
        request()->merge(['with_extra' => true]);
        $eagerload = [
            'orders' => function($query) use ($id) {
                return $query->where('ord_id',$id);
            },
            'orders.shop',
            'orders.currency',
            'orders.menu',
            'orders.menu.variations',
            'orders.menu.extras'
        ];
        return response([
            "order" => OrderResource::collection(
                $client->load($eagerload)->orders
            )],
            200
        );
    }
}
