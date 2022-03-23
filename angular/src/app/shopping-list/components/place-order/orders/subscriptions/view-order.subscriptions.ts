import { Subject } from "rxjs";
import { OrderModelWithItems } from "src/models/order.model";
import { Order, SubscriptionObject } from "src/types";

export const viewOrderSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchSingleOrder',
        callback: function(response){
            this.loading = false;
            this.currentOrder = new OrderModelWithItems( response.data[0] )
            console.log(this.currentOrder)
        },
        generator: function(){
            return new Subject<Order>()
        }
    }
]
