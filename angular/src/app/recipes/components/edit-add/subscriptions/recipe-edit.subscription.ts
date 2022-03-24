import { Subject } from "rxjs";
import { Recipe, SubscriptionObject } from "src/types";

export const recipeEditSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchSingleRecipe',
        callback: function(response){
            this.loading = false;
            this.currentRecipe = response.data[0]
        },
        generator: function(){
            return new Subject<Recipe>()
        }
    }
]