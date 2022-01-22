import { Component, Input, EventEmitter, Output } from "@angular/core";
import { ServerService } from "src/services";
import { Log } from "src/types";

@Component({
    selector:'server', 
    templateUrl:'./templates/server.template.html'
})
export class ServerComponent 
{
    @Input() enabled: boolean;
    @Input() id: string;
    @Input() name: string;
    @Input() onServerDelete: any;
    @Output() emitLog: EventEmitter<Log> = new EventEmitter<Log>();

    reverse: boolean = false;

    constructor(
        public serverService : ServerService ) {}

    toggleReverse(e: Event)
    {
        this.reverse = !this.reverse
        this.serverService.addServerLog(`The server ${this.name} has been ${this.reverse ? 'reversed': 'corrected'}!`)
    }

    toggleServer( id: string )
    {
      this.serverService.toggleServer(id,!this.enabled)
    }
  
    delete( id: string   )
    {

    }
}