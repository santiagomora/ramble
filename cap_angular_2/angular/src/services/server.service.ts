import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PlainHttpOptions, Server } from "src/types";
import { LoggerService } from "./logger.service";
import { HttpService } from "./http.service";
import { CommunicationService } from "./communication.service";
import { Subscription } from "rxjs";

@Injectable()
export class ServerService
{
    constructor(
        private httpService: HttpService,
        private loggerService: LoggerService,
        private commService: CommunicationService ){}

    get intercom()
    {
        return this.commService.intercom
    }

    addServerLog(description:string)
    {
        // this.loggerService.addLog(<Log>{
        //     type:"server",
        //     createdAt: new Date(),
        //     description
        // })
    }

    appendServer( server:Server )
    {
      //this.servers = [...this.servers,server]
    }

    reloadDependencies = ( message: (data:any) => string, avoidDataCheck:boolean = false ):any => 
    {
        return (response) => 
        {
            const {data} = response
            if (data||avoidDataCheck)
            {
                this.commService.notify('reloadServers')
                    .then(
                        () => {
                            this.loggerService
                                .addLog(message(data),'server')
                                .add(
                                    () => {
                                        this.commService.pushMessage(response)
                                        this.commService.notify('reloadLogs')
                                    }
                                )
                        }
                    )
            }
        }
    }

    addServer = ( {name,enabled}:{name: string,enabled: boolean} ) =>
    {
        this.httpService.prepareRequest('post')({
            endpoint:'server/add',
            onRequestSuccess:this.reloadDependencies(
                (data) => `Created server "${data.name}" with id: ${data._id}.`
            ),
            data:{name,enabled}
        });
    }

    toggleServer( id:string,enabled:boolean )
    {
        this.httpService.prepareRequest('put')({
            endpoint:`server/toggle/${id}`,
            onRequestSuccess: this.reloadDependencies(
                () => `Server ${id} is now ${enabled ? 'enabled': 'disabled'}.`,
                true
            ),
            data:{enabled}
        });
    }

    fetchData = ( endpoint: string, subject,plainOptions : PlainHttpOptions ) =>
    {
       this.httpService.prepareRequest("get")({
           endpoint, 
           onRequestSuccess: (data) => subject.next(data),
           plainOptions
       })
    }

    serverDelete = ( id: number ) : Server|null =>
    {
        return null
        // let idPos,deletedServer;
        // if ( (idPos=findById(id,this.servers))>=0 )
        // {
        //     deletedServer = this.servers.splice(idPos,1).pop()
        //     this.addServerLog(`[serverID:${deletedServer.id}] Server ${deletedServer.name} was deleted.`)
        //     return deletedServer;
        // }
        // return null;
    }

    
}