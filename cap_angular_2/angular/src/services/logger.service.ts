import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LogType, PlainHttpOptions, PlainObject } from "src/types";
import { CommunicationService } from "./communication.service";
import { HttpService } from "./http.service";

@Injectable()
export class LoggerService
{
    constructor(
        private httpService: HttpService,
        private commService: CommunicationService ) {}
        
    get intercom()
    {
        return this.commService.intercom
    }

    addLog = ( description:string, type: LogType ) => 
    {
        return this.httpService.prepareRequest('post')({
            endpoint:`log/add`,
            onRequestSuccess:() => {},
            data:{description,type}
        })
    }

    fetchData = ( endpoint: string, subject,options:PlainHttpOptions ) =>
    {
        this.httpService.prepareRequest("get")({
            endpoint, 
            onRequestSuccess:(data) => subject.next(data),
            plainOptions:options 
        })
    }

    getLogs = ( logType: LogType ) => {return []}
}