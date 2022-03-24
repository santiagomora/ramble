import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/services";

@Injectable()
class isAuthenticated implements HttpInterceptor
{
    constructor(
        private authService: AuthenticationService )
    {}
    
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler ): Observable<HttpEvent<any>>
    {

        let token, confReq = ( token = this.authService.token ) 
            ? req.clone({headers:req.headers.set('Authorization',`Bearer ${token}`)})
            : req.clone();
        return next.handle(confReq)
    }
}

export const isAuthenticatedInterceptor = {
    useClass: isAuthenticated,
    provide: HTTP_INTERCEPTORS,
    multi:true
}