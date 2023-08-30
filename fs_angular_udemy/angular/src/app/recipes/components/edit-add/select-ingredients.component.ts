import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { findById } from 'src/helper';
import { defaultIngredient, IngredientFormControl } from './forms/ingredient.form';

type UnresolvedIngredient = typeof defaultIngredient

@Component({
  selector: 'select-ingredients',
  templateUrl:'./templates/select-ingredient.template.html'
})
export class SelectIngredientsComponent implements OnInit{

    @Input() form;

    @Output() deleteIngredient = new EventEmitter<number>();
    
    private initialValue: UnresolvedIngredient;

    showForm: boolean = true;

    get optionName()
    {  
        let pos = findById(this.form.value.item,this.form.items)
        return pos>=0 ? this.form.items[pos].name : "";
    }

    get itemUnit(){
        const pos = findById(this.form.get('item').value,this.form.items)
        const item = this.form.items[pos]
        return item.unit.shortName
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
