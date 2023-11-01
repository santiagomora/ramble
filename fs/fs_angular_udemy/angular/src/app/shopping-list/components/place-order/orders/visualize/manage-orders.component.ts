import { Component } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { OrderService } from 'src/app/shopping-list/services/order.service';
import { OrderModelWithoutItems } from 'src/models/order.model';
import { FetchResponse, Item, Pagination } from 'src/types';
import { SubscriptionManager } from 'src/utils';
import { manageOrdersSubscriptions } from '../subscriptions/manage-orders.subscriptions';

@Component({
  selector: 'manage-orders',
  templateUrl: './templates/manage-orders.template.html'
})
export class ManageOrdersComponent 
{
  public orders: OrderModelWithoutItems[];

  public pagination: Pagination;

  public loading: boolean = true; 
  
  private subscriptionManager: SubscriptionManager<ManageOrdersComponent> = new SubscriptionManager<ManageOrdersComponent>( this,manageOrdersSubscriptions )
  
  constructor( 
    public orderService: OrderService,
    public simpleModalService: SimpleModalService ) 
  {}

  fetchData = ( query = {limit:4,skip:0} ) =>
  {
    this.loading = true;
    this.orderService.request.fetch<Item>(
      'order',
      this.subscriptionManager.get<FetchResponse<Item>>('fetchPaginatedOrders'),
      {query}
    )
  }


  ngOnInit(): void 
  {
    this.fetchData()
  }

  get orderModelWithoutItems()
  {
    return OrderModelWithoutItems
  }

}
