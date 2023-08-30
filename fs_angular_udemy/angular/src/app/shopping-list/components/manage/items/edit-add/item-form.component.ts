import { Component, Input } from '@angular/core';
import { SubscriptionManager } from 'src/utils';
import { FetchResponse, Item, Unit } from 'src/types';
import { ItemFormControl } from './forms/item.form';
import { itemFormSubscriptions } from './subscriptions/item-form.subscription';
import { ShoppingService } from 'src/app/shopping-list/services/shopping.service';
import { ItemService } from 'src/app/shopping-list/services/item.service';

@Component({
  selector: 'item-form',
  templateUrl:'./templates/item-form.template.html'
})
export class ItemFormComponent 
{
  @Input() isEdit: boolean = false;

  @Input() currentItem?: Item;

  @Input() submitHandler;

  loading:boolean = true;

  formControl: ItemFormControl;

  private subscriptionManager: SubscriptionManager<ItemFormComponent> = new SubscriptionManager<ItemFormComponent>( this,itemFormSubscriptions )

  constructor( 
    public itemService: ItemService ) 
  {}

  ngOnInit(): void 
  {
    this.itemService.request.fetch<{units:Unit[]}>(
      'cart-item/form',
      this.subscriptionManager.get<FetchResponse<{units:Unit[]}>>('fetchFormData'),
      {}
    )
  }
  
  onSubmit( ev: Event )
  {
    this.submitHandler(this.formControl.value)
  }

}