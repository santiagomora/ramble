import { Component, OnInit } from '@angular/core';
import { Log, TimerStatus } from 'src/types';

@Component({
    selector: 'game-component',
    template: `
        <div class="container-fluid my-5">
            <div class="row">
                <div class="col-12">
                    <h1 class="font-weight-bolder">My Game!</h1>
                </div>
            </div>
            <div class="row my-4">
                <div class="col-6 container-fluid">
                    <div class="row">
                        <div class="col-6">
                            <counter-component
                                [counter]="evenNumber"
                                [title]="'Even counter'">
                            </counter-component>
                        </div>
                        <div class="col-6">
                            <counter-component 
                                [title]="'Odd counter'"
                                [counter]="oddNumber">
                            </counter-component>
                        </div>
                        <div class="col-12 text-center">
                            <control-component 
                                (evenNumberChanged)="evenNumberChanged($event)"
                                (oddNumberChanged)="oddNumberChanged($event)">
                            </control-component>
                        </div>
                    </div>
                </div>
                <div class="col-6" >
                    <div class="p-3" [ngStyle]="{backgroundColor:'var(--light)'}">
                        <h3 class="font-weight-bolder text-center">Timer Logs</h3>
                        <logging-component></logging-component>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class GameComponent implements OnInit 
{

    evenNumber: number=0;

    oddNumber: number=0;

    logs: Log[] = []

    constructor() { }

    ngOnInit(): void {
    }

    evenNumberChanged(even: number)
    {
        this.oddNumber = even;
    }

    oddNumberChanged(odd: number)
    {
        this.evenNumber = odd;
    }
        
}
