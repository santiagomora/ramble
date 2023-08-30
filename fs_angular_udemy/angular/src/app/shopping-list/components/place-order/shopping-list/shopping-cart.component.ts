import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from 'src/types';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'shopping-cart',
  template: `
    <div class="container-fluid p-0">
      <div *ngIf="orderItems.length<=0" class="row">
        <div class="col-12">
          <ul class="list-group">
            <li class="list-group-item">
              Empty order  
            </li>
          </ul>
        </div>
      </div>
      <ul 
        class="list-group">
        <li class="list-group-item container-fluid p-2"  
          *ngFor="let oi of orderItems; let i = index">
          <div class="row">
            <div class="col">
              <h6 class="font-weight-bolder d-inline">{{oi.item.name}}</h6>
            </div>
            <div class="col-auto text-right">
              <h6 class="d-inline">×</h6>
              <h6 class="d-inline">{{oi.quantity}} <strong>{{oi.item.unit.shortName}}</strong></h6>
              <button 
                class="btn btn-danger ml-2 py-0 font-weight-bolder"
                (click)="orderService.deleteFromCart(i)">
                delete
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div class="row mt-3" *ngIf="orderItems.length>0">
        <div class="col-12 text-right">
          <button 
            class="btn px-2 py-0 btn-warning font-weight-bolder mr-2"
            (click)="orderService.deleteOrder()">
            delete all
          </button>
          <button 
            class="btn btn-primary px-2 py-0 font-weight-bolder"
            (click)="createOrder()">
            send
          </button>
        </div>
      </div>
    </div>
  `
})
export class ShoppingCartComponent
{
  get orderItems(){
    return this.orderService.orderItems
  }

  constructor(
    public orderService: OrderService )
  {}

  createOrder()
  {
    this.orderService.createOrder({
      items:this.orderItems.map( ({quantity,item}) => ({quantity,item:item._id}))
    })
  }

}
