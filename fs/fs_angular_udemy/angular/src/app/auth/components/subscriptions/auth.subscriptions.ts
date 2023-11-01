import { SubscriptionObject, User } from "src/types";

export const authSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchUser',
        callback: function(user: User){
            this.user = user;
        },
        generator: function(){
            return this.authService.user;
        }
    }
]
