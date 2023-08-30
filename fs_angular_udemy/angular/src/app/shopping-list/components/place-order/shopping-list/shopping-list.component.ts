import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item, Pagination } from 'src/types';
import { SubscriptionManager } from 'src/utils';
import { OrderService } from '../../../services/order.service';
import { itemSubscription } from './subscriptions/items.subscription';

@Component({
  selector: 'shopping-list',
  templateUrl:'./templates/shopping-list.template.html'
})
export class ShoppingListComponent implements OnInit
{
  public items = []

  public loading : boolean = true

  public pagination: Pagination;

  private subscriptionManager: SubscriptionManager<ShoppingListComponent> = new SubscriptionManager<ShoppingListComponent>( this,itemSubscription )
  
  constructor(
    public route: ActivatedRoute,
    public orderService: OrderService)
  {}

  ngOnInit(): void 
  {
    this.fetchData()    
  }

  fetchData = ( query = {limit:4,skip:0} ) =>
  {
    this.loading = true;
    this.orderService.request.fetch<Item>(
      'cart-item',
      this.subscriptionManager.get('fetchPaginatedItems'),
      {query}
    )
  }
  
}
