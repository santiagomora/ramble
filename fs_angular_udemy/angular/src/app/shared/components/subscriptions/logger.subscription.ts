import { Subject } from "rxjs";
import { FetchResponse, Log, SubscriptionObject } from "src/types";

export const loggerSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchPaginatedLogs',
        callback: function(response){
            this.loading = false;
            this.logs = response.data.data;
            this.pagination = response.data.pagination
        },
        generator: function (){
            return new Subject<FetchResponse<Log>>()
        }
    },
    {
        name:'fetchLogType',
        callback: function(data){
            this.type=data.type
        },
        generator: function (){
            return this.route.data
        }
    },
    {
        name:'reloadLogs',
        callback: function(type){
            if(type === 'reloadLogs')
            {
                this.fetchData();
            }
        },
        generator: function(){
            return this.loggerService.intercom
        }
    },
]
