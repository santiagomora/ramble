import { Component, OnInit } from '@angular/core';
import { SubscriptionManager } from 'src/utils';
import { AuthenticationService } from 'src/services';
import { User } from 'src/types';
import { authSubscriptions } from 'src/app/auth/components/subscriptions/auth.subscriptions';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-component',
  template:`
    <ul 
        [ngStyle]="{listStyle:'none'}" 
        class="d-inline">
        <li
            *ngIf="!user; else theresUser">
        </li>
        <ng-template #theresUser>
            <li class="d-inline-block px-2">
                <a class="font-weight-bolder"
                    [routerLinkActive]="['text-secondary']"
                    routerLink="/game">
                    Game
                </a>
            </li>
            <li class="d-inline-block px-2">
                <a class="font-weight-bolder"
                    [routerLinkActive]="['text-secondary']"
                    routerLink="/recipes" >
                    Recipes
                </a>
            </li>
            <li class="d-inline-block px-2">
                <a class="font-weight-bolder"
                    [routerLinkActive]="['text-secondary']"
                    routerLink="/shopping-list" >
                    Shopping list
                </a>
            </li>
            <li class="d-inline-block px-2">
                <a class="font-weight-bolder"
                    [routerLinkActive]="['text-secondary']"
                    routerLink="/servers" >
                    Servers
                </a>
            </li>    
            <li class="d-inline-block px-2">
                <button 
                    (click)="authService.logout()"
                    class="btn btn-danger font-weight-bolder  px-2 py-0">
                    logout
                </button>
            </li>
        </ng-template>
    </ul>
  `
})
export class NavComponent
{
    user: User;
    private authSubscriptions: SubscriptionManager<NavComponent> = new SubscriptionManager<NavComponent>(this,authSubscriptions) 
    constructor(
        public router: Router,
        public authService: AuthenticationService )
    {}
}