import { unique,BaseForm } from "src/utils";
import { AbstractControl, FormControl, Validators } from "@angular/forms";
import { Ingredient, Item } from "src/types";

export const defaultIngredient = {
    item: '',
    quantity: 0
}

export class IngredientFormControl extends BaseForm
{
    public isNew: boolean = true;

    constructor(
        ingredient = defaultIngredient, 
        getter: () => AbstractControl[], 
        position: number,
        private _items: Item[] )
    {
        super({
            item: new FormControl(
                ingredient.item||'',
                [
                    Validators.required,
                    unique(getter,'item',position)
                ]
            ),
            quantity: new FormControl(
                ingredient.quantity||0,
                [
                    Validators.required,
                    Validators.min(1)
                ]
            )
        });
        this.isNew = ingredient.item === '';
    }
    
    get items()
    {
        return this._items
    }

}