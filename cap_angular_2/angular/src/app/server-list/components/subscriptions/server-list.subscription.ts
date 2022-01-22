import { Subject } from "rxjs";
import { PaginatedData, Server, SubscriptionObject } from "src/types";

export const serverListSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchPaginatedServers',
        callback: function(response){
            this.loading = false
            this.servers = response.data.data;
            this.pagination = response.data.pagination
        },
        generator: function(){
            return new Subject<PaginatedData<Server[]>>()
        }
    },
    {
        name:'reloadServers',
        callback: function(type){
            if(type === 'reloadServers')
            {
                this.fetchData();
            }
        },
        generator: function(){
            return this.serverService.intercom
        }
    }
]
