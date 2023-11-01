import { SubscriptionObject } from "src/types";

export const messageSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchMessages',
        callback: function(response){
            this.data = response;
        },
        generator: function(){
            return this.commService.messages
        }
    }
]
