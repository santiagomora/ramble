import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CommunicationService,RequestService } from "src/services";
import { FetchResponse, Log, LogType, PlainHttpOptions } from "src/types";

@Injectable()
export class LoggerService
{
    constructor(
        private requestService: RequestService,
        private commService: CommunicationService ) 
    {}
        
    get intercom()
    {
        return this.commService.intercom
    }

    addLog( 
        log: Log )
    {
        return this.requestService.send<Log>('log/add',log)
        /*return this.httpService2.prepareRequest('post')({
            endpoint:`log/add`,
            onRequestSuccess:() => {},
            data:{description,type}
        })*/
    }

    fetchData( 
        type: LogType,
        subject: BehaviorSubject<FetchResponse<Log>>,
        options: PlainHttpOptions )
    {
        return this.requestService
            .fetch<Log>(`log/${type}`,subject,options)
        /*this.httpService2.prepareRequest("get")({
            endpoint, 
            onRequestSuccess:(data) => subject.next(data),
            plainOptions:options 
        })*/
    }

    getLogs = ( logType: LogType ) => {return []}
}