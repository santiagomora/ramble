import { Component } from "@angular/core";

@Component({
    selector:'place-order-entry',
    template:`
        <div class="container-fluid">
            <div class="row justify-content-end">
                <div class="col-12 mb-3">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link"
                                [routerLinkActiveOptions]="{'exact':true}"
                                [routerLinkActive]="['text-secondary','active']"
                                routerLink="/shopping-list">
                                shopping list
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" 
                                [routerLinkActive]="['text-secondary','active']"
                                routerLink="/shopping-list/orders">
                                manage orders
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col-12">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `
})
export class PlaceOrderEntryComponent
{}