import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/services';

@Component({
  selector: 'recipe-actions',
  template: `
    <a 
        [routerLink]="editAction" 
        class="btn btn-success px-1 py-0 font-weight-bolder">
        Edit
    </a>
    <button 
        class="btn btn-danger px-1 py-0 font-weight-bolder ml-2"
        (click)="deleteRecipe(recipeId)">
        Delete
    </button>
    <button 
        class="btn btn-primary px-1 py-0 font-weight-bolder ml-2"
        >
        Shop ingredients
    </button>
  `
})
export class RecipeActionsComponent implements OnInit 
{
    @Input() recipeId: string;
    @Input() editAction: string;

    constructor( 
      public recipeService: RecipeService ) {}

    ngOnInit(): void {}

    deleteRecipe( recipeId: string )
    {
      this.recipeService.deleteRecipe(recipeId)
    }

}
