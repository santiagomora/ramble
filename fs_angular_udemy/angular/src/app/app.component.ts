import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <message-outlet-component outletType="topLeftCorner">
    </message-outlet-component>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-11 pt-3">
          <header-component></header-component>
          <router-outlet></router-outlet>
          <footer-component></footer-component>
        </div>
      </div>
    </div>
  `
})
export class AppComponent {
  title :string = 'cap-udemy-app';
  name :string = 'luis'

}
