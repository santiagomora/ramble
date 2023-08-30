import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { PlainHttpOptions,HttpOptions,PlainObject, HttpMethod, HttpVerb, PlainMessage, RequestParams } from 'src/types';

const API_URL = 'http://localhost:3001/api'

@Injectable()
export class HttpService
{
    private options: HttpOptions;
    
    private _error : Subject<any> = new Subject<any>();

    private httpMethod : HttpMethod;

    private defaultHeaders = {
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
    }

    constructor(
        private httpClient: HttpClient ){}

    get error()
    {
        return this._error
    }

    get unknownHttpError() : PlainMessage
    {
        return {
            data: null,
            message: "There's been an unknown error",
            outlet: "topLeftCorner",
            type: "error"
        }
    }

    private get defaultHttpOptions()
    {
        return { headers:this.defaultHeaders,query:{}}
    }

    private generateOption<U extends { set: ( key: any,value: any ) => U }>( 
        plainObj: PlainObject, 
        construct: new ( ...args: any[] ) => U )
    {
        return Object.keys(plainObj).reduce(
            (t,e) => t.set(e,plainObj[e]),
            new construct()
        )
    }

    private generateHttpOptions( 
        plainParams: PlainObject = {},
        plainHeaders: PlainObject = {} ) : HttpOptions
    {
        const headers = {...plainHeaders,...this.defaultHeaders}
        return {
            params: this.generateOption<HttpParams>(plainParams,HttpParams),
            headers: this.generateOption<HttpHeaders>(headers,HttpHeaders)
        }
    }

    private loadOptions( 
        options: PlainHttpOptions ={headers:this.defaultHeaders,query:{}} ) : HttpOptions
    {
        return this.generateHttpOptions(options.query,options.headers)
    }

    private buildRequest = (
        {endpoint,onRequestSuccess,data,plainOptions,onRequestError} : RequestParams
    ) : Subscription =>
    {
        return (
            data 
                ? this.httpMethod(`${API_URL}/${endpoint}`,data,this.loadOptions(plainOptions))
                : this.httpMethod(`${API_URL}/${endpoint}`,this.loadOptions(plainOptions)) 
        ).subscribe(
            onRequestSuccess,
            (error : HttpErrorResponse) => 
            {
                if(onRequestError)
                {
                    onRequestError(error);
                }
                this._error.next(
                    (error.error||{}).message ? error.error : this.unknownHttpError
                )
            }
        )
    }

    public prepareRequest(verb : HttpVerb)
    {
        this.httpMethod = this.httpClient[verb].bind(this.httpClient);
        return this.buildRequest
    }
}