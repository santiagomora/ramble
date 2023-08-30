import { Subject } from "rxjs";
import { FetchResponse, Item, SubscriptionObject } from "src/types";

export const itemSubscription: SubscriptionObject[] = [
    {
        name:'fetchPaginatedItems',
        callback: function(response){
            this.loading = false;
            this.items = response.data.data
            this.pagination = response.data.pagination
        },
        generator: function(){
            return new Subject<FetchResponse<Item>>()
        }
    },{
        name:'fetchIngredients',
        callback: function(data){
            if( (data||{}).items ){
                this.orderService.addItemsToCart(data.items.items)
            }
        },
        generator: function (){
            return this.route.data
        }
    }
]
