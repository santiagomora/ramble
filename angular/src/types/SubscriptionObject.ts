import { Observable, Subject } from "rxjs"

type SubscriptionObject = { 
    name:string,
    callback: (...args: any[]) => any,
    generator: (...args: any[]) => Subject<any> | Observable<any>
}

export {SubscriptionObject}