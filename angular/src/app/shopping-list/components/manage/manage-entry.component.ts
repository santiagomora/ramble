import { Component } from '@angular/core';

@Component({
  selector: 'manage-entry',
  template: `
    <div class="container-fluid p-0">
        <div class="row justify-content-end align-items-end">
            <div class="col">
                <h2>shopping list - manage</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link"
                            [routerLinkActive]="['text-secondary','active']"
                            routerLink="/shopping-list/manage/items">
                            manage items
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" 
                            [routerLinkActive]="['text-secondary','active']"
                            routerLink="/shopping-list/manage/units">
                            manage units
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-12">
                <div class="col py-3 px-0">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    </div>
  `
})
export class ManageEntryComponent 
{}
