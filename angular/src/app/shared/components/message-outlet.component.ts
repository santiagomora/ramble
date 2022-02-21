import { Component, Input, ViewEncapsulation } from "@angular/core";
import { SubscriptionManager } from "src/utils";
import { CommunicationService } from "src/services";
import { messageSubscriptions } from "./subscriptions/messages.subscription";
import { MessageOutlet } from "src/types";
import { BehaviorSubject } from "rxjs";

@Component({
    selector:'message-component',
    template: `
        <li class="alert container-fluid message" [ngClass]="{
            'alert-danger':data.type==='error',
            'alert-success':data.type==='success',
            'alert-primary':data.type==='info'
        }">
            <div class="row">
                <div class="col">
                    {{data.message}}
                </div>
                <div class="col-auto">
                    <button 
                        [ngStyle]="{height:'20px',width:'20px',lineHeight:'20px'}"
                        class="btn font-weight-bolder p-0"
                        [ngClass]="{
                            'btn-danger':data.type==='error',
                            'btn-success':data.type==='success',
                            'btn-primary':data.type==='info'
                        }"
                        (click)="data.close()">
                        ×
                    </button>
                </div>
            </div>
        </li>
    `
})
export class MessageComponent
{
    @Input() data;
}

@Component({
    selector:'message-outlet-component',
    template: `
        <ul class="p-0 messageOutlet"
            [ngClass]="{
                'headerOutlet':outletType==='inHeader',
                'topLeftCornerOutlet':outletType==='topLeftCorner',
                'noDisplayOutlet':outletType==='noDisplay',
                'inComponent': outletType==='inComponent'
            }"
            [ngStyle]="{listStyle:'none'}"
            *ngIf="messages.length>0">
            <ng-container *ngFor="let message of messages">
                <ng-container *ngIf="message.outlet===outletType">
                    <message-component 
                        [data]="message">
                    </message-component>
                </ng-container>
            </ng-container>
        </ul>
    `
})
export class MessageOutletComponent
{
    subscriptionManager: SubscriptionManager<MessageOutletComponent> = new SubscriptionManager<MessageOutletComponent>(this,messageSubscriptions);

    @Input() outletType : MessageOutlet;

    get messages()
    {
        const messages = this.subscriptionManager.get('fetchMessages');
        return messages instanceof BehaviorSubject
            ? messages.value
            : []
    }

    constructor(
        public commService: CommunicationService )
    {}

}