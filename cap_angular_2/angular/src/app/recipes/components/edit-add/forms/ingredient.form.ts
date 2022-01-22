import { inArray, unique,BaseForm } from "src/utils";
import { AbstractControl, FormControl, Validators } from "@angular/forms";
import { Ingredient, ResolvedIngredient, ResolvedUnit } from "src/types";

export const defaultIngredient = {
    _id:null,
    ingredient:{_id:null},
    unit:{_id:null},
    quantity:null
}

export class IngredientFormControl extends BaseForm
{
    public isNew: boolean = true;

    constructor(
        ingredient = defaultIngredient, 
        getter: () => AbstractControl[], 
        position: number,
        private _ingredients: ResolvedIngredient[],
        private _units: ResolvedUnit[] )
    {
        super({
            ingredient: new FormControl(
                ingredient.ingredient._id,
                [
                    Validators.required,
                    unique(getter,'ingredient',position)
                ]
            ),
            unit: new FormControl(
                ingredient.unit._id,
                [
                    Validators.required
                ]
            ),
            quantity: new FormControl(
                ingredient.quantity,
                [
                    Validators.required,
                    Validators.min(0)
                ]
            )
        });
        this.isNew = ingredient._id === null;
    }
    
    get ingredients()
    {
        return this._ingredients
    }

    get units()
    {
        return this._units
    }

}