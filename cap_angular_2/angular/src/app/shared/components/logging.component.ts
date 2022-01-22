import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionManager } from 'src/utils';
import { LoggerService } from 'src/services';
import { loggerSubscriptions } from './subscriptions/logger.subscription';
import { Log, Pagination } from 'src/types';

@Component({
  // this works as a css selector 
  // we can write this as [app-server]
  // and angular would render it inside an html element that has the app-server property
  // like: <div app-server></div>
  // or a class by using .app-server like <div class="app-server"></div>
  // you cant use pseudo selectors
  selector: 'logging-component',
  //templateUrl: './servers.component.html',
  // we can change tempalteURL to be an html string, this way we wouldnt need the 
  template:`
    <conditional-component
      [condition]="logs && !loading">
      <ng-template conditionalContent>
        <pagination-component 
          [fetchData]="fetchData"
          [pagination]="pagination">
          <ng-template paginatedContent>
            <ul class="list-group">
              <li 
                class="list-group-item"
                *ngIf="logs.length<=0">
                No logs found.
              </li>
              <li 
                class="list-group-item"
                *ngFor="let log of logs">
                <div><strong>{{log.createdAt}}</strong></div>
                <div><span>{{log.description}}</span></div>
                <div class="text-right"><span class="badge badge-success">{{log.type}}</span></div>
              </li>
            </ul>
          </ng-template>
        </pagination-component>
      </ng-template>
    </conditional-component>
  `,
  // './servers.component.html'. using the template key
  // either templateUrl or template must be present not both
  //styleUrls: ['./server-list.component.css'],
  //we can also use inline styling with the styles key
  // styles = ['h3{color:blue}','h4{color:gray}' ]
})
export class LoggingComponent implements OnInit,OnDestroy
{
  public logs: Log[];
  
  public pagination: Pagination = null;

  private type: string;

  public loading: boolean = true;

  subscriptionManager: SubscriptionManager<LoggingComponent>;

  constructor(
    public route: ActivatedRoute,
    public loggerService: LoggerService )
  {
    this.subscriptionManager = new SubscriptionManager<LoggingComponent>(this,loggerSubscriptions)
  }

  fetchData = ( options = {limit:4,skip:0} ) =>
  {
    this.loading = true;
    this.loggerService.fetchData(
      `log/${this.type}`,
      this.subscriptionManager.get('fetchPaginatedLogs'),
      {query:options}
    )
  }

  ngOnInit(): void 
  {
    this.fetchData();
  }

  ngOnDestroy(): void
  {
    this.subscriptionManager.destroy()
  }

}
