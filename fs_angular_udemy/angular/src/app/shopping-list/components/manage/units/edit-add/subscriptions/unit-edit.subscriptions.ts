import { Subject } from "rxjs";
import { Recipe, SubscriptionObject } from "src/types";

export const unitEditSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchSingleUnit',
        callback: function(response){
            this.loading = false;
            this.currentUnit = response.data[0]
        },
        generator: function(){
            return new Subject<Recipe>()
        }
    }
]
