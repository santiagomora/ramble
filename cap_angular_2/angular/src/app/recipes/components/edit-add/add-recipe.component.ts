import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { findById } from 'src/helper';
import { RecipeService } from 'src/services';
import { Ingredient, Recipe } from 'src/types';

@Component({
  selector: 'add-recipe',
  templateUrl:'./templates/add-recipe.template.html'
})
export class AddRecipeComponent implements OnInit {

  constructor( 
    public recipeService: RecipeService ) {}

  ngOnInit(  ): void {}

  addRecipe = ( recipe: Recipe ) =>
  {
    this.recipeService.sendRecipe('recipe/add',recipe)
  }

}