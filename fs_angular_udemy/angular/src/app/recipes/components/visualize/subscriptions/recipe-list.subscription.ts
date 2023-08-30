import { Subject } from "rxjs";
import { RecipeModel } from "src/models";
import { PaginatedData, Recipe, SubscriptionObject } from "src/types";

export const recipeListSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchPaginatedRecipes',
        callback: function(response){
            this.loading = false;
            this.recipes = response.data.data.map( r => new RecipeModel(r) )
            this.pagination = response.data.pagination
        },
        generator: function(){
            return new Subject<PaginatedData<Recipe[]>>()
        }
    },
    {
        name:'reloadRecipes',
        callback: function(type){
            if(type === 'reloadRecipes')
            {
                this.fetchData();
            }
        },
        generator: function(){
            return this.recipeService.intercom
        }
    }
]
