import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { Recipe } from 'src/types';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'add-recipe',
  templateUrl:'./templates/add-recipe.template.html'
})
export class AddRecipeComponent extends SimpleModalComponent<{},boolean> implements OnInit 
{

  constructor( 
    public recipeService: RecipeService ) 
  {
    super();
  }

  ngOnInit(  ): void {}

  addRecipe = ( recipe: Recipe ) =>
  {
    this.recipeService.request
      .send<Recipe>('recipe/add',recipe)
      .then( this.confirm )
      .then( this.recipeService.reloadDependencies )
  }

  confirm = (t) => {
    this.close()
  }

}