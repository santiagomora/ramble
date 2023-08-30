import { Subject } from "rxjs";
import { Item, SubscriptionObject } from "src/types";

export const itemEditSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchSingleItem',
        callback: function(response){
            this.loading = false;
            this.currentItem = response.data[0]
        },
        generator: function(){
            return new Subject<Item>()
        }
    }
]
