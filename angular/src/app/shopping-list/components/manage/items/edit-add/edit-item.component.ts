import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ItemService } from 'src/app/shopping-list/services/item.service';
import { FetchResponse, Item } from 'src/types';
import { SubscriptionManager } from 'src/utils';
import { itemEditSubscriptions } from './subscriptions/item-edit.subscription';

@Component({
  selector: 'edit-item-form',
  template: `
    <div class="modal-content">
      <conditional-component
        [condition]="!loading">
        <ng-template conditionalContent>
          <div class="modal-header">
            <div class="container-fluid p-0">
              <div class="row">
                <div class="col">
                  <h4>Edit unit {{currentItem.name}}</h4>
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
            <item-form 
              [submitHandler]="editItem"
              [isEdit]="true" 
              [currentItem]="currentItem">
            </item-form>
          </div>
        </ng-template>
      </conditional-component>
    </div>
  `
})
export class EditItemFormComponent extends SimpleModalComponent<{itemId:string},boolean> implements OnInit 
{
  currentItem: Item;

  public itemId: string;

  loading:boolean = true;

  initial: boolean = true;

  private subscriptionManager: SubscriptionManager<EditItemFormComponent> = new SubscriptionManager<EditItemFormComponent>( this,itemEditSubscriptions )

  constructor(
    public itemService: ItemService ) 
  {
    super();
  }

  fetchData = () =>
  {
    if (this.itemId)
    {
      this.itemService.request.fetch<Item>(
        `cart-item/${this.itemId}`,
        this.subscriptionManager.get<FetchResponse<Item>>('fetchSingleItem'),
        {} 
      )
    }
  }

  ngOnInit(): void 
  {
    this.fetchData()
  }

  editItem = ( modifiedItem: Item ) =>
  {
    this.itemService.request.send<Item>(`cart-item/${modifiedItem._id}`,modifiedItem,'put')
      .finally( () => this.confirm() )
  }

  confirm(){
    this.result = true; 
    this.close();
  }

}
