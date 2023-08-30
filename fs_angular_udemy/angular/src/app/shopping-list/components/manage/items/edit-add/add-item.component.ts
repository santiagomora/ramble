import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ItemService } from 'src/app/shopping-list/services/item.service';
import { ShoppingService } from 'src/app/shopping-list/services/shopping.service';
import { Item } from 'src/types';

@Component({
  selector: 'add-item-form',
  template: `
    <div class="modal-content">
      <div class="modal-header">
        <div class="container-fluid p-0">
          <div class="row">
            <div class="col">
              <h4>Create new Item</h4>
            </div>
            <div class="col text-right ">
              <button type="button" 
                class="btn btn-danger font-weight-bolder px-2 py-0" 
                (click)="close()" >
                &times;
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <message-outlet-component outletType="inComponent">
        </message-outlet-component>
        <item-form [submitHandler]="addItem">
        </item-form>
      </div>
    </div>
  `
})
export class AddItemFormComponent extends SimpleModalComponent<{},boolean>
{

  constructor( 
    public itemService: ItemService ) 
  {
    super()
  }

  addItem = ( item: Item ) =>
  {
    this.itemService.request.send<Item>('cart-item',item)
      .finally( 
        () => this.confirm() 
      )
  }

  confirm()
  {
    this.result = true; 
    this.close();
  }

}
