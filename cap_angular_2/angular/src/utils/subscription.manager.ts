import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { SubscriptionObject } from "src/types";

type SubscriptionMember = {
    name:string,
    subject: BehaviorSubject<any> | Subject<any>,
    subscription:Subscription
};

export class SubscriptionManager<T>
{
    private members : {[name:string]:SubscriptionMember} = {};

    private target: T;
    
    constructor( 
        target: T, 
        configArray: SubscriptionObject[] )
    {
        this.target = target;
        this.initializeSubscriptions(configArray)
    }

    generateSubscription( cnf: SubscriptionObject ): SubscriptionMember
    {
        const subject = cnf.generator.bind(this.target)();
        const subscription = subject.subscribe(cnf.callback.bind(this.target))
        return {name:cnf.name,subscription,subject};
    }

    initializeSubscriptions( configArray: SubscriptionObject[] )
    {
        this.members = configArray.reduce(
            (memb,cnf) => 
            {
                memb[cnf.name] = this.generateSubscription(cnf);
                return memb;
            },
            {}
        )
    }

    get( name: string )
    {
        return this.members[name].subject;
    }
    
    add( name: string, conf: SubscriptionObject )
    {
        if( !this.members[name] )
        {
            this.members[name] = this.generateSubscription(conf)
        }
    }

    destroy()
    {
        Object.keys(this.members).map(
            name => this.members[name].subscription.unsubscribe()
        )
    }

}