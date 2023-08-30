import { Component, OnInit } from '@angular/core';
import { Log, TimerStatus } from 'src/types';

@Component({
    selector: 'game-component',
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h1 class="font-weight-bolder">my game!</h1>
                </div>
            </div>
            <div class="row my-4">
                <div class="col-6 container-fluid">
                    <div class="row">
                        <div class="col-6">
                            <counter-component
                                [counter]="evenNumber"
                                [title]="'even counter'">
                            </counter-component>
                        </div>
                        <div class="col-6">
                            <counter-component 
                                [title]="'odd counter'"
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
                        <h3 class="font-weight-bolder">timer logs</h3>
                        <logging-component></logging-component>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class GameComponent
{

    evenNumber: number=0;

    oddNumber: number=0;

    logs: Log[] = []

    evenNumberChanged(even: number)
    {
        this.oddNumber = even;
    }

    oddNumberChanged(odd: number)
    {
        this.evenNumber = odd;
    }
        
}
