import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ManageEntryComponent } from './components/manage/manage-entry.component';
import { isAuthenticatedGuard } from 'src/services/guards';
import { ShoppingListComponent } from './components/place-order/shopping-list/shopping-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ManageUnitsComponent } from './components/manage/units/visualize/manage-units.component';
import { ShoppingCartComponent } from './components/place-order/shopping-list/shopping-cart.component';
import { AddItemToCartComponent } from './components/place-order/shopping-list/add-item-to-cart.component';
import { AddUnitFormComponent } from './components/manage/units/edit-add/add-unit.component';
import { EditUnitFormComponent } from './components/manage/units/edit-add/edit-unit.component';
import { UnitFormComponent } from './components/manage/units/edit-add/unit-form.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../shared/shared.module';
import { AddItemFormComponent } from './components/manage/items/edit-add/add-item.component';
import { EditItemFormComponent } from './components/manage/items/edit-add/edit-item.component';
import { ItemFormComponent } from './components/manage/items/edit-add/item-form.component';
import { ManageItemsComponent } from './components/manage/items/visualize/manage-items.component';
import { ShoppingService } from './services/shopping.service';
import { ItemService } from './services/item.service';
import { UnitService } from './services/unit.service';
import { OrderService } from './services/order.service';
import { PlaceOrderEntryComponent } from './components/place-order/place-order.entry.component';
import { ManageOrdersComponent } from './components/place-order/orders/visualize/manage-orders.component';
import { ViewOrderComponent } from './components/place-order/orders/visualize/view-order.component';
import { NavigationStateResolver } from '../shared/services/resolver/navigation-state.resolver';

const routes: Routes = [
    { 
        path:'shopping-list',
        component:PlaceOrderEntryComponent,
        canActivate:[isAuthenticatedGuard],
        resolve:{
            items: NavigationStateResolver
        },
        children:[
            {
                path:'',
                pathMatch: 'full',
                component:ShoppingListComponent
            },
            {
                path:'orders',
                pathMatch: 'full',
                component:ManageOrdersComponent
            },
            {
                path:'manage',
                component:ManageEntryComponent,
                children:[
                    {
                        path:'items',
                        pathMatch: 'full',
                        component:ManageItemsComponent
                    },
                    {
                        path:'units',
                        pathMatch: 'full',
                        component:ManageUnitsComponent
                    },
                ]
            }
        ]
    }
]

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingCartComponent,
        AddItemFormComponent,
        ManageOrdersComponent,
        ViewOrderComponent,
        ManageEntryComponent,
        PlaceOrderEntryComponent,
        AddItemFormComponent,
        AddItemToCartComponent,
        EditItemFormComponent,
        ManageItemsComponent,
        AddItemToCartComponent,
        AddUnitFormComponent,
        EditUnitFormComponent,
        UnitFormComponent,
        ItemFormComponent,
        ManageUnitsComponent
    ],
    imports: [
        DataTablesModule,
        CommonModule, 
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers:[
        ShoppingService,
        ItemService,
        UnitService,
        OrderService
    ],
    exports: [
        RouterModule
    ]
})
export class ShoppingListModule 
{}
