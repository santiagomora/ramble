import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { findById } from 'src/helper';
import { Ingredient, ResolvedIngredient, ResolvedUnit, UnresolvedIngredient } from 'src/types';

type HasIdName = {_id:string|number,name:string}

function findFieldValueById<T extends HasIdName>( 
    id: string| number, 
    objectArray: T[] )
{
    for( let i=0; i<objectArray.length; i++ )
    {
        if (objectArray[i]._id === id)
        {
            return i
        }
    }
    return -1;
}

@Component({
  selector: 'select-ingredients',
  templateUrl:'./templates/select-ingredient.template.html'
})
export class SelectIngredientsComponent implements OnInit{

    @Input() form;

    @Output() deleteIngredient = new EventEmitter<number>();
    
    private initialValue: UnresolvedIngredient;

    showForm: boolean = false;

    getOptionName<T extends HasIdName>( id:string,values: T[] )
    {
        let pos = findFieldValueById<T>(id,values)
        return pos>=0 ? values[pos].name : "";
    }
    
    saveValue(e: Event)
    {
        e.preventDefault()
        this.form.isNew = false;
        this.initialValue = {...this.form.value};
        this.toggleForm()
    }

    ngOnInit()
    {
        this.initialValue = {...this.form.value}
        this.showForm = this.form.isNew
    }

    toggleForm = () => 
    {
        this.showForm = !this.showForm
    }

    onCancel()
    {
        if ( !this.form.isNew )
        {
            this.form.setValue( this.initialValue )
            this.toggleForm()
        }
        else 
        {
            this.deleteIngredient.emit()
        }
    }

}
