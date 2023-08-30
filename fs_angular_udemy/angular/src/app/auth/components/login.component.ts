import { Component } from "@angular/core";
import { AuthenticationService } from "src/services";
import { LoginFormControl } from "./forms/login.form";

@Component({
    selector:'login-component',
    templateUrl: './templates/login.template.html'
})
export class LoginComponent 
{
    formControl: LoginFormControl = new LoginFormControl();

    constructor( 
        public authService: AuthenticationService ){}

    submit()
    {
        this.authService.login(this.formControl.value)
    }
}