import { FormControl, Validators } from "@angular/forms";
import { BaseForm } from 'src/utils';
import { Item, Unit } from "src/types";

export class ItemFormControl extends BaseForm
{
    isNew: boolean
    _units : Unit[]
    constructor( 
        currentItem: Item = {} as Item,
        formData: {units:Unit[]} )
    {
        super({
            ...( 
                currentItem._id 
                ? {
                    _id:new FormControl(
                        currentItem._id || '',
                        currentItem._id ? [Validators.required] : []
                    ),
                    userId:new FormControl(
                        currentItem.userId || '',
                        currentItem._id ? [Validators.required] : []
                    )
                } 
                : {}
            ),
            ...{  
                name:new FormControl(
                    currentItem.name || '',
                    [Validators.required]
                ),
                description:new FormControl(
                    currentItem.description ||'',
                    [Validators.required]
                ),  
                price:new FormControl(
                    currentItem.price || 0,
                    [Validators.required]
                ),
                brand:new FormControl(
                    currentItem.brand || '',
                    [Validators.required]
                ),
                unit:new FormControl(
                    (currentItem.unit||{})._id ||'',
                    [Validators.required]
                )
            }
        });
        this.isNew = currentItem._id === null;
        this._units = formData.units
    }
    get units() : Unit[]
    {
        return this._units
    }
}