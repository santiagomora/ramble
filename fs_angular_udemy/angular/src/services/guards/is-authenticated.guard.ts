import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/services";

@Injectable()
export class isAuthenticatedGuard implements CanActivate
{
    constructor(
        private router: Router,
        private authService: AuthenticationService ){}
    
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot ) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        if(!this.authService.token)
        {
            return this.router.navigate([''])
        }
        return true
    }
}