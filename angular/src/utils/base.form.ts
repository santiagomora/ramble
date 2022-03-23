import { AbstractControl, FormArray, FormGroup } from "@angular/forms"

const errorMessages = {
    required: (fieldName: string) => `The field ${fieldName} is required.`,
    unique: (fieldName: string) => `The field ${fieldName} must be unique`,
    inArray: (fieldName: string) => `The field ${fieldName} must be in array`,
}

export class BaseForm extends FormGroup
{
    _errors( fieldPath: string, fieldName: string = fieldPath ) : string[]
    {
        let errors; 
        const fieldControl = this.get(fieldPath)
        if (! ( errors= fieldControl&&fieldControl.errors ) )
        {
            return null;
        }
        return Object.keys(errors).map(
            ruleName => errorMessages[ruleName]
                ? errorMessages[ruleName](fieldName)
                : ruleName
        )
    }
}
