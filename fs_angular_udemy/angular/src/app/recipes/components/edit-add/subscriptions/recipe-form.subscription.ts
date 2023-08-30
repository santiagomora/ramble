import { Subject } from "rxjs";
import { RecipeFormData, SubscriptionObject } from "src/types";
import { RecipeFormControl } from "../forms/recipe.form";

export const recipeFormSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchFormData',
        callback: function(response){
            const {items} = response.data;
            this.loading=false
            this.formControl = new RecipeFormControl(this.currentRecipe,{items})
        },
        generator: function(){
            return new Subject<RecipeFormData>()
        }
    }
]
