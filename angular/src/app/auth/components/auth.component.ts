import { Component } from "@angular/core";
import { SubscriptionManager } from "src/utils";
import { AuthenticationService } from "src/services";
import { User } from "src/types";
import { authSubscriptions } from './subscriptions/auth.subscriptions'

@Component({
    selector:'auth-component',
    templateUrl:'./templates/auth.template.html'
})
export class AuthComponent
{
    user: User = null;
    private authSubscriptions: SubscriptionManager<AuthComponent> = new SubscriptionManager<AuthComponent>(this,authSubscriptions) 
    constructor( 
        public authService: AuthenticationService ) {}
}
