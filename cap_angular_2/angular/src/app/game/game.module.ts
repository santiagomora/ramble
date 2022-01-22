import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { GameComponent } from './game.component';
import { CounterComponent } from './counter.component';
import { ControlComponent } from './control.component';
import { TimerService } from 'src/services';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from 'src/services/guards';
import { SharedModule } from '../shared/shared.module';

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
