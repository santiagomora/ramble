import { Component, Input, OnInit } from '@angular/core';
import { FetchResponse, Pagination, Server } from 'src/types'
import { SubscriptionManager } from 'src/utils';
import { ServerService } from '../services/server.service';
import { serverListSubscriptions } from './subscriptions/server-list.subscription';


@Component({
  // this works as a css selector 
  // we can write this as [app-server]
  // and angular would render it inside an html element that has the app-server property
  // like: <div app-server></div>
  // or a class by using .app-server like <div class="app-server"></div>
  // you cant use pseudo selectors
  selector: 'server-list',
  //templateUrl: './servers.component.html',
  // we can change tempalteURL to be an html string, this way we wouldnt need the 
  templateUrl:'./templates/server-list.template.html',
  // './servers.component.html'. using the template key
  // either templateUrl or template must be present not both
  //styleUrls: ['./server-list.component.css'],
  //we can also use inline styling with the styles key
  // styles = ['h3{color:blue}','h4{color:gray}' ]
})
export class ServerListComponent implements OnInit
{
  @Input() title: string;

  @Input() enabled: boolean;

  loading: boolean = true;

  servers: Server[];
  
  pagination: Pagination;

  subscriptionManager: SubscriptionManager<ServerListComponent>; 

  constructor(
    public serverService: ServerService )
  {
    this.subscriptionManager = new SubscriptionManager<ServerListComponent>(this,serverListSubscriptions);
  }
  
  fetchData = ( options = {skip:0,limit:4} ) =>
  {
    this.loading = true;
    this.serverService.fetchData(
      this.subscriptionManager.get<FetchResponse<Server>>('fetchPaginatedServers'),
      {query:{enabled:this.enabled,...(options||{})}}
    )
  }
  
  ngOnInit()
  {
    this.fetchData()
  }
}
