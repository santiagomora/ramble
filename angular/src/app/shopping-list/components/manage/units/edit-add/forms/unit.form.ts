import { FormControl, Validators } from "@angular/forms";
import { BaseForm } from 'src/utils';
import { Unit } from "src/types";

export class UnitFormControl extends BaseForm
{
    isNew: boolean

    constructor( 
        currentUnit: Unit = {} as Unit )
    {
        super({
            ...( 
                currentUnit._id 
                ? {
                    _id:new FormControl(
                        currentUnit._id || '',
                        currentUnit._id ? [Validators.required] : []
                    ),
                    userId:new FormControl(
                        currentUnit.userId || '',
                        currentUnit._id ? [Validators.required] : []
                    )
                } 
                : {}
            ),
            ...{  
                shortName:new FormControl(
                    currentUnit.shortName || '',
                    [Validators.required]
                ),
                longName:new FormControl(
                    currentUnit.longName ||'',
                    [Validators.required]
                )
            }
        });
        this.isNew = currentUnit._id === null;
    }
}
