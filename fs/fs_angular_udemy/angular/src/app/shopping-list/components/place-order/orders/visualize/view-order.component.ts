import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { ItemService } from 'src/app/shopping-list/services/item.service';
import { OrderService } from 'src/app/shopping-list/services/order.service';
import { OrderModelWithItems } from 'src/models/order.model';
import {  FetchResponse, OpenerComponent, Order } from 'src/types';
import { SubscriptionManager } from 'src/utils';
import { viewOrderSubscriptions } from '../subscriptions/view-order.subscriptions';

@Component({
  selector: 'edit-unit-form',
  templateUrl: './templates/view-order.template.html'
})
export class ViewOrderComponent extends SimpleModalComponent<{orderId:string},boolean> implements OnInit,OpenerComponent 
{
  currentOrder: OrderModelWithItems;

  public orderId: string;

  loading:boolean = true;

  initial: boolean = true;

  private subscriptionManager: SubscriptionManager<ViewOrderComponent> = new SubscriptionManager<ViewOrderComponent>( this,viewOrderSubscriptions )

  constructor(
    public simpleModalService : SimpleModalService,
    public itemService: ItemService,
    public orderService: OrderService ) 
  {
    super();
  }

  fetchData = () =>
  {
    if(this.orderId)
    {
      this.orderService.request.fetch<Order>(
        `order/${this.orderId}`,
        this.subscriptionManager.get<FetchResponse<Order>>('fetchSingleOrder'),
        {}
      )
    }
  }

  ngOnInit(): void 
  {
    this.fetchData()
  }

  confirm(){
    this.result = true; 
    this.close();
  }

}
