import { Component, Input } from '@angular/core';
import { ShoppingService } from 'src/app/shopping-list/services/shopping.service';
import { Unit } from 'src/types';
import { UnitFormControl } from './forms/unit.form';

@Component({
  selector: 'unit-form',
  templateUrl:'./templates/unit-form.template.html'
})
export class UnitFormComponent 
{
  @Input() isEdit: boolean = false;

  @Input() currentUnit?: Unit;

  @Input() submitHandler;

  loading:boolean = true;

  formControl: UnitFormControl;

  constructor( 
    public shoppingService: ShoppingService ) 
  {
  }

  ngOnInit(): void 
  {
    this.formControl = new UnitFormControl(this.currentUnit)
  }
  
  onSubmit( ev: Event )
  {
    this.submitHandler( 
      this.isEdit 
        ? {...this.formControl.value,_id:this.currentUnit._id}
        : this.formControl.value
    )
  }

}