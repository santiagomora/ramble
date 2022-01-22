import { FormArray, FormControl, Validators } from "@angular/forms";
import { BaseForm } from 'src/utils';
import { IngredientFormControl,defaultIngredient } from './ingredient.form'
import { Recipe, ResolvedIngredient, ResolvedUnit } from "src/types";

export class RecipeFormControl extends BaseForm
{
    constructor( 
        currentRecipe: Recipe = {} as Recipe, 
        private formData:{ingredients: ResolvedIngredient[],units: ResolvedUnit[]} )
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
                    (ing,ind) => new IngredientFormControl(
                        ing,
                        () => this._ingredients,
                        ind,
                        formData.ingredients,
                        formData.units
                    )
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
                this.formData.ingredients,
                this.formData.units 
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
