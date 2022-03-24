import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-component',
  // styles: [
  //   `
  //     .open nav-component{
  //       display:block;
  //       z-index:30;
  //       width:250px !important;
  //       top:40px !important;
  //       right:15px !important;
  //     }`
  //     ,`
  //     nav-component {
  //       display:none;
  //       position:absolute;
  //     }
  //   `
  // ],
  template:`
    <nav class="container-fluid">
      <div class="row">
        <div class="col-auto">
          <a routerLink="">
            <h1 class="mb-0 font-weight-bolder">
              my app!
            </h1>
          </a>
        </div>
        <div class="d-flex justify-content-end container col text-right flex-column">
            <nav-component></nav-component> 
        </div>
        <div class="col-12">
          <hr/>
          <message-outlet-component outletType="inHeader">
          </message-outlet-component>
        </div>
      </div>
    </nav>
  `
})
export class HeaderComponent implements OnInit 
{
  ngOnInit()
  {}
}