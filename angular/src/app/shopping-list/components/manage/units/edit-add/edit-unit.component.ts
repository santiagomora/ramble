import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ShoppingService } from 'src/app/shopping-list/services/shopping.service';
import { UnitService } from 'src/app/shopping-list/services/unit.service';
import { FetchResponse, Unit } from 'src/types';
import { SubscriptionManager } from 'src/utils';
import { unitEditSubscriptions } from './subscriptions/unit-edit.subscriptions';

@Component({
  selector: 'edit-unit-form',
  template: `
    <div class="modal-content">
      <conditional-component
        [condition]="!loading">
        <ng-template conditionalContent>
          <div class="modal-header">
            <div class="container-fluid p-0">
              <div class="row">
                <div class="col">
                  <h4>Edit unit {{currentUnit.longName}}</h4>
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
            <unit-form [submitHandler]="editUnit"
              [isEdit]="true" 
              [currentUnit]="currentUnit">
            </unit-form>
          </div>
        </ng-template>
      </conditional-component>
    </div>

  `
})
export class EditUnitFormComponent extends SimpleModalComponent<{unitId:string},boolean> implements OnInit 
{
  currentUnit: Unit;

  public unitId: string;

  loading:boolean = true;

  initial: boolean = true;

  private subscriptionManager: SubscriptionManager<EditUnitFormComponent> = new SubscriptionManager<EditUnitFormComponent>( this,unitEditSubscriptions )

  constructor(
    public unitService: UnitService ) 
  {
    super();
  }

  fetchData = () =>
  {
    if(this.unitId)
    {
      this.unitService.request.fetch<Unit>(
        `unit/${this.unitId}`,
        this.subscriptionManager.get<FetchResponse<Unit>>('fetchSingleUnit'),
        {}
      )
    }
  }

  ngOnInit(): void 
  {
    this.fetchData()
  }

  editUnit = ( modifiedUnit: Unit ) =>
  {
    this.unitService.request
      .send<Unit>(`unit/${modifiedUnit._id}`,modifiedUnit,'put')
      .finally( () => this.confirm() )
  }

  confirm(){
    this.result = true; 
    this.close();
  }

}
