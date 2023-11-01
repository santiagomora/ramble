import { Component, ContentChild, Input } from "@angular/core";
import { ConditionalContentDirective } from "../directives";

@Component({
    selector: 'conditional-component',
    template:`
        <ng-container 
            *ngIf="condition; else loading"
            [ngTemplateOutlet]="content.conditionalRef">
        </ng-container>
        <ng-template #loading>
            <div>loading...</div>
        </ng-template>
    `
})
export class ConditionalComponent
{
    @ContentChild(ConditionalContentDirective) 
    content!: ConditionalContentDirective;

    @Input() condition: boolean

}