import { FetchResponse, PlainHttpOptions, PlainMessage } from "src/types"
import { HttpService } from "./http.service"
import { CommunicationService } from "./communication.service"
import { Router } from "@angular/router"
import { BehaviorSubject } from "rxjs"
import { Injectable } from "@angular/core"

@Injectable()
export class RequestService
{
    constructor( 
        private httpService: HttpService,
        private commService: CommunicationService )
    {}

    /*reloadDependencies = ( afterNotify: (data: any) => any ) : any => 
    {
        return (message) => 
        {
            if( message )
            {
                this.commService.notify('reloadItems').then( afterNotify(message) )
            }
        }
    }*/

    send<T>( 
      endpoint: string, 
      data: T, 
      requestType:"post"|"put" = "post") : Promise<PlainMessage>//,
      //afterNavigate: string ='' )
    {
        return new Promise<PlainMessage>(
            (resolve,reject) => 
            {
                this.httpService.prepareRequest(requestType)({
                    endpoint,
                    onRequestSuccess:(response) => resolve(response),
                    data
                })
            }
        ).then( 
            (response : PlainMessage) => {
                this.commService.pushMessage(response)
                return response
                /*if(afterNavigate)
                {
                    this.router.navigate([afterNavigate]) 
                }*/
            }
        )
    }

    delete( //T = plain message in most cases
        endpoint:string): Promise<PlainMessage>//,
        //afterSuccess?: string )
    {
        return new Promise<PlainMessage>(
            (resolve,reject) => 
            {
                this.httpService.prepareRequest("delete")({
                    endpoint,
                    onRequestSuccess://this.reloadDependencies(
                        (response) => resolve(response)//(response) => () => resolve(response)
                    //)
                })
            }
        )
        .then( 
            (response : PlainMessage) => {
                this.commService.pushMessage(response)
                return response
                /*if(afterSuccess)
                {
                    this.router.navigate([afterSuccess])
                }*/
            }
        )
    }


    fetch<T>( 
        endpoint: string, 
        subject: BehaviorSubject<FetchResponse<T>>,
        plainOptions : PlainHttpOptions ) : Promise<FetchResponse<T>>
    {
        return new Promise<FetchResponse<T>>(
            (resolve,reject) => 
            {
                this.httpService.prepareRequest("get")({
                    endpoint,
                    onRequestSuccess:(data) => resolve(data),
                    plainOptions
                })
            }
        ).then( 
            (data : FetchResponse<T>) => {
                //this.commService.pushMessage(response)
                subject.next(data)
                return data;
                /*if(afterSuccess)
                {
                    this.router.navigate([afterSuccess])
                }*/
            }
        )
        
    }
}