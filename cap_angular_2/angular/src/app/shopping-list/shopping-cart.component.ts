import { Component, Input, OnInit } from '@angular/core';
import { ShoppingService } from 'src/services';
import { Ingredient } from 'src/types';

@Component({
  selector: 'shopping-cart',
  template: `
    <div class="container-fluid p-0">
      <div *ngIf="items.length<=0" class="row">
        <div class="col-12">
          <ul class="list-group">
            <li class="list-group-item">
              No items found  
            </li>
          </ul>
        </div>
      </div>
      <ul 
        class="list-group">
        <li
          class="list-group-item container-fluid p-2"  
          *ngFor="let itm of items">
          <div class="row">
            <div class="col">
              <h6 class="font-weight-bolder d-inline">{{itm.name}}</h6>
            </div>
            <div class="col-auto text-right">
              <h6 class="d-inline">×</h6>
              <h6 class="d-inline">{{itm.quantity}} <strong>{{itm.unit}}</strong></h6>
              <button 
                class="btn btn-danger ml-2 py-0 font-weight-bolder"
                (click)="shoppingService.deleteFromCart(itm.id)">
                delete
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div class="row mt-3" *ngIf="items.length>0">
        <div class="col-12">
          <button 
            class="btn w-100 btn-warning font-weight-bolder"
            (click)="shoppingService.deleteOrder()">
            delete all
          </button>
        </div>
      </div>
    </div>
  `
})
export class ShoppingCartComponent implements OnInit 
{
  @Input() items = []

  constructor( 
    public shoppingService: ShoppingService
   ) { }

  ngOnInit(): void {
  }

}
