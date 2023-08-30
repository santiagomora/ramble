import { Injectable } from "@angular/core";
import { CommunicationService, RequestService } from "src/services";
import { Log } from "src/types";

@Injectable()
export class TimerService
{
    constructor( 
        private commService: CommunicationService, 
        private requestService: RequestService )
    {}

    addLog = ( log : Log ) =>
    {
        return this.requestService
            .send<Log>(`log/add`,log)
            .then(
                () => this.commService.notify('reloadLogs')
            )
    }

}