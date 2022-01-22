import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingCartComponent } from './shopping-cart.component';
import { AddItemFormComponent } from './add-item-form.component';


import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from 'src/services/guards';


const routes: Routes = [
    { 
        path:'shopping-list',
        component:ShoppingListComponent,
        canActivate:[isAuthenticatedGuard]
    }
]

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingCartComponent,
        AddItemFormComponent
    ],
    imports: [
        CommonModule, 
        FormsModule,
        BrowserModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ShoppingListModule { }
