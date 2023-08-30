import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './components/recipes.component';

import { RecipeListComponent } from './components/visualize/recipe-list.component'
import { RecipeSidebarComponent } from './components/visualize/recipe-sidebar.component'
import { RecipeViewComponent } from './components/visualize/recipe-view.component'

import { AddRecipeComponent } from './components/edit-add/add-recipe.component';
import { EditRecipeComponent } from './components/edit-add/edit-recipe.component';
import { SelectIngredientsComponent } from './components/edit-add/select-ingredients.component';
import { RecipeFormComponent } from './components/edit-add/recipe-form.component';

import { isAuthenticatedGuard } from 'src/services/guards';
import { SharedModule } from '../shared/shared.module';
import { RecipeService } from './services/recipe.service';

const routes: Routes = [
    { 
        path:'recipes',
        component:RecipesComponent, 
        children:[
            {
                path:':id',
                component: RecipeViewComponent,
                canActivate:[isAuthenticatedGuard]
            },
            {
                path:'edit/:id',
                component: EditRecipeComponent,
                canActivate:[isAuthenticatedGuard]
            },
            {
                path:'',
                component: RecipeListComponent,
                canActivate:[isAuthenticatedGuard]
            }
        ]
    }
]

@NgModule({
    declarations: [
        RecipeViewComponent,
        RecipeSidebarComponent,
        RecipeListComponent,
        AddRecipeComponent,
        EditRecipeComponent,
        RecipeFormComponent,
        RecipesComponent,
        SelectIngredientsComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers:[
        RecipeService
    ],
    exports: [
        RouterModule
    ]
})
export class RecipesModule { }
