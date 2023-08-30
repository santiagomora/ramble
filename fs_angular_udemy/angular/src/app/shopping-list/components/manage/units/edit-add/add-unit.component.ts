import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { UnitService } from 'src/app/shopping-list/services/unit.service';
import { Unit } from 'src/types';

@Component({
  selector: 'add-unit-form',
  template: `
    <div class="modal-content">
      <div class="modal-header">
        <div class="container-fluid p-0">
          <div class="row">
            <div class="col">
              <h4>Create new unit</h4>
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
        <unit-form [submitHandler]="addUnit">
        </unit-form>
      </div>
    </div>
  `
})
export class AddUnitFormComponent extends SimpleModalComponent<{},boolean>
{

  constructor( 
    public unitService: UnitService ) 
  {
    super()
  }

  addUnit = ( unit: Unit ) =>
  {
    this.unitService.request
      .send<Unit>('unit/',unit)
      .finally( () => this.confirm() );
  }

  confirm()
  {
    this.result = true; 
    this.close();
  }

}
