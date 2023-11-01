import { Injectable } from "@angular/core";
import { FetchResponse, Log, PlainHttpOptions, Server } from "src/types";
import { LoggerService } from "../../shared/services/logger.service";
import { CommunicationService } from "../../../services/communication.service";
import { RequestService } from "src/services";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ServerService
{
    constructor(
        private loggerService: LoggerService,
        private requestService : RequestService,
        private commService: CommunicationService )
    {}

    get intercom()
    {
        return this.commService.intercom
    }

    reloadDependencies( 
        requestPromise, 
        logGenerator : (server: Server) => Log )
    {
        return requestPromise
            .then(
                ({data}) => {
                    this.commService.notify('reloadServers')
                    return data
                }
            )
            .then(
                (server: Server) => this.loggerService.addLog(logGenerator(server))
            )
            .then(
                (response) => {this.commService.notify('reloadLogs'); return response;}
            )
    }

    addServer = ( 
        server:Server ) =>
    {
        return this.reloadDependencies(
            this.requestService.send<Server>('server/add',server),
            (server) => ({
                description:`Server "${server.name}" - ${server._id} created`,
                type:'server'
            })
        )
    }

    toggleServer( 
        id:string,
        enabled:boolean )
    {
        return this.reloadDependencies(
            this.requestService.send<{enabled:boolean}>(`server/${id}`,{enabled},'put'),
            (server) => ({
                description:`Server "${server.name}" - ${server._id} is now ${server.enabled ? 'enabled': 'disabled'}.`,
                type:'server'
            })
        )
    }

    fetchData = ( 
        subject : BehaviorSubject<FetchResponse<Server>>,
        plainOptions : PlainHttpOptions ) =>
    {
        return this.requestService
            .fetch<Server>('server',subject,plainOptions)
    }

    serverDelete = ( id: string ) : any =>
    {
        return this.reloadDependencies(
            this.requestService.delete(`server/${id}`),
            (server) => ({
                description:`Server "${server.name}" - ${server._id} has been deleted`,
                type:'server'
            })
        )
    }

    
}