import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActionDescriptor } from "src/types";

@Component({
    selector: 'action-component',
    template:`
        <button 
            *ngIf="actionDescriptor.type === 'button'"
            (click)="actionDescriptor.action(actionDescriptor.data)"
            [class]="_classes">
            {{actionDescriptor.name}}
        </button>
        <button 
            *ngIf="actionDescriptor.type === 'action'"
            (click)="navigate()"
            [class]="_classes">
            {{actionDescriptor.name}}
        </button>
    `
})
export class ActionComponent
{
    @Input() actionDescriptor: ActionDescriptor

    constructor(public router : Router)
    {
    }

    get _classes()
    {
        return this.actionDescriptor.classes.join(' ')
    }

    async navigate(){
        if(this.actionDescriptor.type === 'action'){ // para que typescript no se queje 
            this.router.navigateByUrl(this.actionDescriptor.url,this.actionDescriptor.behavior)
        }
    }
}