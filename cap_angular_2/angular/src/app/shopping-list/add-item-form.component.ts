import { Component, Input, OnInit } from '@angular/core';
import { ShoppingService } from 'src/services';
import { Ingredient } from 'src/types';

@Component({
  selector: 'add-item-form',
  template: `
    <div class="container-fluid p-0">
      <div class="row">
          <div class="col" [id]="id">
            <h4>{{name}}</h4>
          </div>
        <div class="col-auto text-right">
          <button 
            (click)="addUnit(1)"
            class="py-0 px-2 btn btn-primary font-weight-bolder">
            +
            </button>
          <h4 class="d-inline mx-2">{{quantity}} {{unit}}</h4>
          <button 
            (click)="addUnit(-1)"
            class="py-0 px-2 btn btn-primary font-weight-bolder">
            -
          </button>
          <button 
            [disabled]="!enableAdd"
            class="btn btn-success ml-2 py-0 font-weight-bolder"
            (click)="onItemAdd($event)">
            add
          </button>
        </div>
        <div class="col-12">
          <hr/>
        </div>
      </div>
    </div>
  `
})
export class AddItemFormComponent implements OnInit 
{
  @Input() id:number;
  @Input() name:string;
  @Input() unit;
  enableAdd:boolean= false
  quantity: number=0;

  constructor( public shoppingService: ShoppingService ) { }

  cleanForm()
  {
    this.quantity = 0;
    this.enableAdd=false;
  }

  ngOnInit(): void {
  }

  addUnit( quantity: number ){
    this.quantity = (this.quantity<=0&&quantity<0) 
      ? this.quantity
      : this.quantity+quantity
    this.enableAdd=this.quantity>0;
  }

  onItemAdd(e:Event)
  {
    e.preventDefault()
    if (this.enableAdd)
    {
      // this.shoppingService.addToCart(
      //   <Ingredient>{
      //     id:this.id,
      //     name:this.name,
      //     unit:this.unit,
      //     quantity:this.quantity
      //   }
      // )
      // this.cleanForm()
    }
  }

}
