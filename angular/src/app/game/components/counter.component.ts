import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'counter-component',
    template: `
        <h1 class="text-center font-weight-bolder">
            {{counter}}
        </h1>
        <h3 class="text-center">{{title}}</h3>
    `
})
export class CounterComponent implements OnInit 
{
    @Input() title : string;
    @Input() counter : number;

    constructor() { }

    ngOnInit(): void {
    }


}
