import { SubscriptionObject, User } from "src/types";

export const registerSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchUser',
        callback: function(user: User){
            if(user)
            {
                this.router.navigate([''])
            }
        },
        generator: function(){
            return this.authService.user;
        }
    }
]
