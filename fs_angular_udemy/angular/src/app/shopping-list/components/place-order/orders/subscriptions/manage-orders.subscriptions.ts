import { Subject } from "rxjs";
import { OrderModelWithoutItems } from "src/models/order.model";
import { FetchResponse, Order, SubscriptionObject } from "src/types";

export const manageOrdersSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchPaginatedOrders',
        callback: function(response){
            this.loading = false;
            this.orders = response.data.data.map( e => new OrderModelWithoutItems(e) )
            this.pagination = response.data.pagination
        },
        generator: function(){
            return new Subject<FetchResponse<Order>>()
        }
    }
]
