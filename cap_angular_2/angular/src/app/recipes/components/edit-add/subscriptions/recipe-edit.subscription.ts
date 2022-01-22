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
    },
    {
        name:'fetchRecipeId',
        callback: function(data){
            this.recipeId=data.id
            if(!this.initial)
            {
                this.fetchData()
            }
        },
        generator: function (){
            return this.route.params
        }
    }
]
