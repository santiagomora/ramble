import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SubscriptionManager } from "src/utils";
import { AuthenticationService } from "src/services";
import { User } from "src/types";
import { RegisterFormControl } from "./forms/register.form";
import { registerSubscriptions } from "./subscriptions/register.subscriptions";

@Component({
    selector:'register-component',
    templateUrl: './templates/register.template.html'
})
export class RegisterComponent
{
    formControl = new RegisterFormControl

    user: User;

    private authSubscriptions: SubscriptionManager<RegisterComponent> = new SubscriptionManager<RegisterComponent>(this,registerSubscriptions) 

    constructor(
        private router: Router,
        private authService: AuthenticationService ) {}

    submit()
    {
        this.authService.register(this.formControl.value)
    }
}