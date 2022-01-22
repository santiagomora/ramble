import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/services';
import { Ingredient } from 'src/types';

@Component({
  selector: 'shopping-list',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div 
          class="col-4 py-3" 
          [ngStyle]="{backgroundColor:'var(--light)'}">
          <h3>Your items!</h3>
          <shopping-cart 
            [items]="shoppingService._items">
          </shopping-cart>
        </div>
        <div class="col-8">
          <h2>Add some items to your cart.</h2>
          <add-item-form 
            *ngFor="let itm of items"
            [id]="itm.id"
            [name]="itm.name"
            [unit]="itm.unit">
          </add-item-form>
        </div>
      </div>
    </div>
  `
})
export class ShoppingListComponent implements OnInit {

  items = []

  constructor(
    public shoppingService: ShoppingService
  ) { }

  ngOnInit(): void {
  }
}
