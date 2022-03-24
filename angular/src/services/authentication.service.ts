import { BehaviorSubject } from "rxjs";
import { CommunicationService } from "./communication.service";
import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {AuthCredentials,UserRegister,User,AuthToken, PlainMessage} from 'src/types'
import { deleteToken, getToken, storeToken } from "src/helper";

@Injectable()
export class AuthenticationService
{
    private _user : BehaviorSubject<User> = new BehaviorSubject<User>(getToken().user);

    private _token : AuthToken = getToken().token;

    constructor(
        private httpService: HttpService,
        private router: Router,
        private commService: CommunicationService ) 
    {
        // deleteToken()
        if(this._token)
        {
            this.setAutoLogout(this._token.exp*1000-(new Date()).getTime())
        }
    }

    get user()
    {
        return this._user;
    }

    get token()
    {
        if(this._token)
        {
            return this._token.payload
        }
        return ''
    }
    
    private onLogout = () =>
    {
        this._user.next(null);
        this._token = null;
        deleteToken();
        this.router.navigate([''])
    }

    private setAutoLogout( expTime: number )
    {
        const interval = setTimeout(
            () => {
                this.onLogout();
                clearTimeout(interval)
            },
            expTime
        )
    }
    
    private setUser = (message : PlainMessage) =>
    {
        if (message.data)
        {
            this._token = message.data.token
            this._user.next(message.data.user)
            storeToken(message.data)
            this.commService.pushMessage(message)
            this.setAutoLogout(this._token.exp*1000-(new Date()).getTime())
        }
    }

    login( credentials: AuthCredentials )
    {
        this.httpService.prepareRequest('post')({
            endpoint:'auth/login',
            onRequestSuccess:this.setUser,
            data:credentials
        })
    }

    register( registry: UserRegister )
    {
        this.httpService.prepareRequest('post')({
            endpoint:'auth/register',
            onRequestSuccess:this.setUser,
            data:registry
        })
    }

    logout()
    {
        this.httpService.prepareRequest("get")({
            endpoint:'auth/logout',
            onRequestSuccess:this.onLogout
        })
    }

}