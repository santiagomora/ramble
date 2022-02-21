import { BehaviorSubject, Subject } from "rxjs";
import { Message } from "src/utils";
import {Notification, PlainMessage} from 'src/types'
import { HttpService } from ".";
import { Injectable } from "@angular/core";
import { findById } from "src/helper";

@Injectable()
export class CommunicationService
{
    private _messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([])

    private _intercom: Subject<Notification> = new Subject<Notification>()

    constructor(
        private httpService: HttpService )
    {
        this.httpService.error.subscribe(this.pushMessage)
    }

    get messages()
    {
        return this._messages;
    }

    get intercom()
    {
        return this._intercom
    }

    notify( notification: Notification )
    {
        return new Promise(
            (resolve,reject) => 
            {
                this._intercom.next(notification)
                resolve(null);
            }
        )
    }

    destroy = ( id: number ) => 
    {
        let position;
        const messages = [...this._messages.value];
        if( (position = findById(id,messages) )>=0 )
        {
            messages.splice(position,1);
            this._messages.next(messages);
        }
    }

    pushMessage = ( message: PlainMessage ) =>
    {
        const messages = this._messages.value
        const messageInstance = new Message(messages.length,message,this.destroy)
        this.messages.next( [...messages,messageInstance] )
    }

}