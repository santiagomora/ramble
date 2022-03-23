import { Component } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ItemService } from 'src/app/shopping-list/services/item.service';
import { ItemModel } from 'src/models';
import { FetchResponse, Item, Pagination } from 'src/types';
import { SubscriptionManager } from 'src/utils';
import { manageItemsSubscriptions } from './subscriptions/manage-items.subscriptions';

@Component({
  selector: 'manage-items',
  templateUrl: './templates/manage-items.template.html'
})
export class ManageItemsComponent 
{
  public items: ItemModel[];

  public pagination: Pagination;

  public loading: boolean = true; 
  
  private subscriptionManager: SubscriptionManager<ManageItemsComponent> = new SubscriptionManager<ManageItemsComponent>( this,manageItemsSubscriptions )
  
  constructor( 
    public itemService: ItemService,
    public simpleModalService: SimpleModalService ) 
  {}

  fetchData = ( query = {limit:4,skip:0} ) =>
  {
    this.loading = true;
    this.itemService.request.fetch<Item>(
      'cart-item',
      this.subscriptionManager.get<FetchResponse<Item>>('fetchPaginatedItems'),
      {query}
    )
  }

  ngOnInit(): void 
  {
    this.fetchData()
  }

  get itemModel()
  {
    return ItemModel
  }

}
