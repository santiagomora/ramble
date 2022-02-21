import { FormArray, FormControl, Validators } from "@angular/forms";
import { BaseForm } from 'src/utils';
import { IngredientFormControl,defaultIngredient } from './ingredient.form'
import { Item, Recipe } from "src/types";



export class RecipeFormControl extends BaseForm
{
    constructor( 
        currentRecipe: Recipe = {} as Recipe, 
        private formData:{items: Item[]} )
    {
        super({
            name: new FormControl(
                currentRecipe.name||'',
                [Validators.required]
            ),
            description: new FormControl(
                currentRecipe.description||'',
                [Validators.required]
            ),
            ingredients: new FormArray( 
                (currentRecipe.ingredients||[defaultIngredient]).map(
                    (ing,ind) => new IngredientFormControl(ing,() => this._ingredients,ind,formData.items)
                )
            )
        });
    }
            
    get _ingredients()
    {
        return (<FormArray>this.get('ingredients')).controls 
    }
            
    addIngredient = (ingredient = defaultIngredient) =>
    {
        const ingredients = <FormArray>this.get('ingredients')
        ingredients.push(
            new IngredientFormControl(
                ingredient,
                () => this._ingredients,
                ingredients.length,
                this.formData.items
            )
        )
    }
    
    deleteIngredient( ingIndex: number )
    {
        (<FormArray>this.get('ingredients')).removeAt(ingIndex)
    }

    validIngredients() : boolean
    {
        return this.get('ingredients').valid
    }

}
