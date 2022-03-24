import { Subject } from "rxjs";
import { ItemModel } from "src/models";
import { FetchResponse, Item, SubscriptionObject } from "src/types";

export const manageItemsSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchPaginatedItems',
        callback: function(response){
            this.loading = false;
            this.items = response.data.data.map( e => new ItemModel(e))
            this.pagination = response.data.pagination
        },
        generator: function(){
            return new Subject<FetchResponse<Item>>()
        }
    }
]
