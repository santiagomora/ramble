import { Subject } from "rxjs";
import { PaginatedData, Recipe, SubscriptionObject } from "src/types";

export const recipeSidebarSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchPaginatedRecipes',
        callback: function(response){
            this.recipes = response.data.data
            this.pagination = response.data.pagination
            this.loading = false
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
