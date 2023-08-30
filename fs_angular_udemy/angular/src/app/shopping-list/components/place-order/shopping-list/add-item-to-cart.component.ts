import { Component, Input } from '@angular/core';
import { Item, OrderItem } from 'src/types';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'add-item-to-cart',
  template: `
    <div class="container-fluid p-0">
      <div class="row">
          <div class="col" [id]="item._id">
            <h3><strong>{{item.name}}</strong> - {{item.brand}}</h3>
            <p>{{item.description}}</p>
          </div>
        <div class="col-auto text-right">
          <h4 class="mx-2 align-bottom">{{item.price}} USD / {{item.unit.shortName| uppercase}}</h4>
          <button 
            (click)="addUnit(-1)"
            class="py-0 px-2 btn btn-primary font-weight-bolder">
            -
          </button>
          <h5 class="d-inline mx-2">{{quantity}}</h5>
          <button 
            (click)="addUnit(1)"
            class="py-0 px-2 btn btn-primary font-weight-bolder">
            +
            </button>
          <h5 class="d-inline mx-2">{{item.unit.shortName| uppercase}}</h5>
          <div class="mt-2 text-right">
            <button 
              [disabled]="!enableAdd"
              class="btn btn-success ml-2 py-0 font-weight-bolder"
              (click)="onItemAdd($event)">
              add to cart
            </button>
          </div>
        </div>
        <div class="col-12 text-right">
          <hr/>
        </div>
      </div>
    </div>
  `
})
export class AddItemToCartComponent
{
  @Input() item:Item;
  enableAdd:boolean= false
  quantity: number=0;

  constructor( 
    public orderService: OrderService ) 
  { }

  cleanForm()
  {
    this.quantity = 0;
    this.enableAdd=false;
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
      const oi : OrderItem = {item:this.item,quantity:this.quantity}
      this.orderService.addToCart(oi)
      this.quantity = 0
      this.enableAdd = false
    }
  }

}
