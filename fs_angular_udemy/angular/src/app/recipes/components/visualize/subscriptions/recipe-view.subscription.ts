import { Subject } from "rxjs";
import { RecipeModel } from "src/models";
import { Recipe, SubscriptionObject } from "src/types";

export const recipeViewSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchSingleRecipe',
        callback: function(response){
            this.loading = false;
            this.currentRecipe = new RecipeModel( response.data[0] )
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
