import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoggerService, TimerService } from 'src/services';
import { Log, TimerActions, TimerStatus } from 'src/types';

@Component({
    selector: 'control-component',
    template: `
        <div class="text-center">
            <strong>Timer Status:</strong> {{timerStatus}}
        </div>
        <div class="text-center">
            <input 
                class="form-control my-3"
                type="number"
                [readonly]="['Started','Paused'].indexOf(timerStatus)>=0"
                placeholder="timer [seconds]"
                [(ngModel)]="timerSeconds">
        </div>
        <button 
            [disabled]="['Started'].indexOf(timerStatus)>=0"
            (click)="onTimerStart()"
            class="btn btn-success font-weight-bolder px-2 py-0">
            Start
        </button>
        <button 
            [disabled]="['Stopped','Paused'].indexOf(timerStatus)>=0"
            (click)="onTimerStop()"
            class="btn btn-danger font-weight-bolder ml-2 px-2 py-0">
            Stop
        </button>
        <button 
            [disabled]="['Stopped'].indexOf(timerStatus)>=0"
            (click)="onTimerReset()"
            class="btn btn-warning font-weight-bolder ml-2 px-2 py-0">
            Reset
        </button>
        <button 
            [disabled]="['Stopped'].indexOf(timerStatus)>=0"
            (click)="onTimerPause()"
            class="btn btn-primary font-weight-bolder ml-2 px-2 py-0">
            Pause
        </button>
    `
})
export class ControlComponent implements OnInit 
{
    @Output()
    oddNumberChanged: EventEmitter<number> = new EventEmitter<number>()

    @Output()
    evenNumberChanged: EventEmitter<number> = new EventEmitter<number>()

    timer = null;

    timerSeconds: number;

    elapsedTime: number=0;

    timerStatus: TimerStatus = "Stopped"

    constructor(private timerService: TimerService) { }

    cleanCount()
    {
        this.evenNumberChanged.emit(0)
        this.oddNumberChanged.emit(0)
    }

    buildLog( nextTimerStatus: TimerStatus,action: TimerActions )
    {
        this.timerService.addLog(`Action triggered: ${action}. Timer is now ${nextTimerStatus}.`)
        this.timerStatus = nextTimerStatus
    }

    ngOnInit(): void {}

    handleTimerActive = () => 
    {
        let emitter: EventEmitter<number>;
        this.initializeInterval()
        emitter = (this.elapsedTime%2===0)
            ? this.evenNumberChanged
            : this.oddNumberChanged
        emitter.emit(this.timerSeconds-this.elapsedTime)
        this.elapsedTime--;
    }

    handleTimerDone = () => 
    {
        this.elapsedTime=0;
        this.timerSeconds=null;
        this.timer=null;
        this.cleanCount()
        this.buildLog('Stopped','Stop')
    }


    initializeInterval()
    {
        this.timer = setInterval(
            () => 
            {
                let handler;
                clearInterval(this.timer);
                if (this.timerStatus === 'Started')
                {
                    handler = (this.elapsedTime>=0)
                        ? this.handleTimerActive
                        : this.handleTimerDone
                    handler();
                }
            },
            1000
        )
    }
    
    onTimerStart()
    {
        this.elapsedTime = (this.timerStatus==='Stopped')
            ? this.timerSeconds
            : this.elapsedTime;
        this.buildLog('Started','Start')
        this.initializeInterval();
    }

    onTimerReset()
    {
        this.elapsedTime = this.timerSeconds
        this.buildLog(this.timerStatus,'Reset')
        this.cleanCount()
    }

    onTimerPause()
    {
        this.buildLog('Paused','Pause')
    }

    onTimerStop()
    {
        this.buildLog('Stopped','Stop')
        this.cleanCount()
    }
}
