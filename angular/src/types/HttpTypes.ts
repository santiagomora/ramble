import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { MessageType, PaginatedData } from ".";
import { MessageOutlet } from "./CommunicationTypes";

export type PlainObject = {
    [name:string]:string|number|boolean
}

export type PlainHttpOptions = {[name:string]:PlainObject};

export type HttpOptions = {headers: HttpHeaders, params: HttpParams}

export type HttpMethod = ( (url: string, data?: any, options? : HttpOptions ) => Observable<any> );

export type RequestParams = {
    endpoint: string,
    onRequestSuccess: (...args:any[]) => any,
    data?: any,
    plainOptions?: PlainHttpOptions,
    onRequestError?:(...args:any[]) => any 
}

export type HttpVerb = "post"|"put"|"get"|"delete";

export type FetchData<T> = PaginatedData<T> | T[]

export type FetchResponse<T> = {
    message:string,
    outlet:MessageOutlet,
    type:MessageType,
    data: FetchData<T>
}