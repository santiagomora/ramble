<?php

namespace App\Traits;

use \App\Models\Order;
use \App\Models\OrdersMenu;
use \App\Models\OrdersMenuExtra;
use \App\Models\OrderMenuVariation;

trait CastingMethods {

    public function saveExtras($dest,$extras,$om_id,$access){
        foreach($extras as $kex => $ex){
            $dest::create(
                $dest::cast($om_id,$ex[$access])
            );
        }
    }

    public function saveMenu($items,$order){
        foreach( $items as $kit=>$itm ){
            $menu = OrdersMenu::create(
                OrdersMenu::cast($itm,$order->ord_id)
            );
            $this->saveExtras(OrdersMenuExtra::class,$itm["extras"],$menu->om_id,"id");
            $this->saveExtras(OrderMenuVariation::class,$itm["variations"],$menu->om_id,"var_id");
        }
    }
}
