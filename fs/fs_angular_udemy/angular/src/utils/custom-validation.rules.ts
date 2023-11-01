import { AbstractControl, FormArray, FormControl } from "@angular/forms"
import {ValidatedRule} from 'src/types'

type RuleClosure =  ( control: FormControl ) => ValidatedRule;

export function unique( 
    getterMethod: (path: string) => AbstractControl[],
    fieldName: string,
    position: number  ) : RuleClosure
{
    return function( control: FormControl ): ValidatedRule
    {
        try
        {
            const haystack = getterMethod(fieldName)||[];
            for( let i=0; i<haystack.length; i++ )
            {
                if ( i!==position&&(haystack[i].value[fieldName] === control.value) && control.dirty )
                {
                    return {unique:true};
                }
            } 
        }
        catch(e)
        {
            return null
        }
        return null
    }
}

export function inArray<T>( referenceArray: T[] ) : RuleClosure
{
    return function( control: FormControl ): ValidatedRule
    {
        return ( referenceArray.indexOf(control.value)<0 )
            ? {inArray:true}
            : null
    }
}