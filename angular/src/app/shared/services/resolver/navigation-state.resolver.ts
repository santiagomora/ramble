import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
type RouteState = {[k:string]:any}

@Injectable()
export class NavigationStateResolver implements Resolve<RouteState> 
{

    constructor(private router: Router)
    {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) : Observable<RouterState>|Promise<RouterState>|RouteState 
    {
        return this.router.getCurrentNavigation().extras.state;
    }
}
