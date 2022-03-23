import { Component } from '@angular/core';


@Component({
  // this works as a css selector 
  // we can write this as [app-server]
  // and angular would render it inside an html element that has the app-server property
  // like: <div app-server></div>
  // or a class by using .app-server like <div class="app-server"></div>
  // you cant use pseudo selectors
  selector: 'server-container',
  //templateUrl: './servers.component.html',
  // we can change tempalteURL to be an html string, this way we wouldnt need the 
  templateUrl:'./templates/server-container.template.html',
  // './servers.component.html'. using the template key
  // either templateUrl or template must be present not both
  //styleUrls: ['./server-list.component.css'],
  //we can also use inline styling with the styles key
  // styles = ['h3{color:blue}','h4{color:gray}' ]
})
export class ServerContainerComponent
{
}
