import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from 'src/services/guards';
import { SharedModule } from '../shared/shared.module';

import { ControlComponent } from './components/control.component';
import { CounterComponent } from './components/counter.component';
import { GameComponent } from './components/game.component';
import { TimerService } from './services/timer.service';

const routes: Routes = [
    { 
        path:'game',
        component:GameComponent,
        data:{type:'timer'},
        canActivate:[isAuthenticatedGuard]
    }
]

@NgModule({
    declarations: [
        GameComponent,
        CounterComponent,
        ControlComponent
    ],
    imports: [
        CommonModule, 
        FormsModule,
        BrowserModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers:[
        TimerService
    ]
})
export class GameModule { }
