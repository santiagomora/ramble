import { Injectable } from "@angular/core";
import { CommunicationService } from ".";
import { LoggerService } from "./logger.service";

@Injectable()
export class TimerService
{
    constructor( 
        private commService: CommunicationService, 
        private loggerService: LoggerService ){}

    addLog = ( message: string ) =>
    {
        this.loggerService
            .addLog(message,'timer')
            .add(
                () => this.commService.notify('reloadLogs')
            )
    }

}