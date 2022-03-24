import { Component, Input } from "@angular/core";

@Component({
    selector:'error-bag',
    template: `
        <ul 
            class="p-0"
            [ngStyle]="{listStyle:'none'}">
            <li 
                [ngStyle]="{color:'var(--danger)'}"
                *ngFor="let err of errors">
                {{err}}
            </li>
        </ul>
    `
})
export class ErrorBagComponent
{
    @Input() errors;
}