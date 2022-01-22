import { Subject } from "rxjs";
import { RecipeIngredientFormData, SubscriptionObject } from "src/types";
import { RecipeFormControl } from "../forms/recipe.form";

export const recipeFormSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchFormData',
        callback: function(response){
            const {ingredients,units} = response.data;
            this.loading=false
            this.formControl = new RecipeFormControl(this.currentRecipe,{ingredients,units})
        },
        generator: function(){
            return new Subject<RecipeIngredientFormData>()
        }
    }
]
