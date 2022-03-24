import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LoggingComponent } from '../shared/components/logging.component';

import { ServerComponent } from './components/server.component';
import { ServerListComponent } from './components/server-list.component';
import { AddServerFormComponent } from './components/add-server-form.component';
import { ServerContainerComponent } from './components/server-container.component';

import { isAuthenticatedGuard } from 'src/services/guards';
import { ServerService } from './services/server.service';

const routes : Routes = [
    { 
        path:'servers',
        component:ServerContainerComponent,
        children: [
            {
                path:'',
                component:LoggingComponent,
                data:{type:'server'},
                canActivate:[isAuthenticatedGuard]
            }
        ]
    }
]

@NgModule({
    declarations:[
        ServerComponent,
        AddServerFormComponent,
        ServerContainerComponent,
        ServerListComponent
    ],
    imports:[
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers:[
        ServerService
    ],
    exports:[
        RouterModule
    ]
})
export class ServerListModule { }
