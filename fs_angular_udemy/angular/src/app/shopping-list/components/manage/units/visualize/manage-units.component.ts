import { Component } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { UnitService } from 'src/app/shopping-list/services/unit.service';
import { UnitModel } from 'src/models';
import { FetchResponse, Pagination, Unit } from 'src/types';
import { SubscriptionManager } from 'src/utils';
import { manageUnitsSubscriptions } from './subscriptions/manage-units.subscriptions';

@Component({
  selector: 'manage-units',
  templateUrl: './templates/manage-units.template.html'
})
export class ManageUnitsComponent 
{
  public units: UnitModel[];

  public pagination: Pagination;

  public loading: boolean = true; 
  
  private subscriptionManager: SubscriptionManager<ManageUnitsComponent> = new SubscriptionManager<ManageUnitsComponent>( this,manageUnitsSubscriptions )
  
  constructor( 
    public unitService: UnitService,
    public simpleModalService: SimpleModalService ) 
  {}

  fetchData = ( query = {limit:4,skip:0} ) =>
  {
    this.loading = true;
    this.unitService.request.fetch<Unit>(
      'unit',
      this.subscriptionManager.get<FetchResponse<Unit>>('fetchPaginatedUnits'),
      {query}
    )
  }

  ngOnInit(): void 
  {
    this.fetchData()
  }

  get unitModel()
  {
    return UnitModel
  }  
}
