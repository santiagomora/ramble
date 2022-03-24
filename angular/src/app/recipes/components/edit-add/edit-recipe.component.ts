import { Component, OnInit } from '@angular/core';
import { SubscriptionManager } from 'src/utils';
import { Recipe } from 'src/types';
import { recipeEditSubscriptions } from './subscriptions/recipe-edit.subscription';
import { RecipeService } from '../../services/recipe.service';
import { SimpleModalComponent } from 'ngx-simple-modal';

@Component({
  selector: 'edit-recipe',
  templateUrl:'./templates/edit-recipe.template.html'
})
export class EditRecipeComponent extends SimpleModalComponent<{recipeId:string},boolean> implements OnInit 
{  
  currentRecipe: Recipe;

  private recipeId: string;

  loading:boolean = true;

  initial: boolean = true;

  private subscriptionManager: SubscriptionManager<EditRecipeComponent> = new SubscriptionManager<EditRecipeComponent>( this,recipeEditSubscriptions )

  constructor(
    public recipeService: RecipeService ) 
  {
    super()
  }

  fetchData = () =>
  {
      this.recipeService
        .request
        .fetch<Recipe>(
          `recipe/${this.recipeId}`,
          this.subscriptionManager.get('fetchSingleRecipe'),
          {query:{withoutPopulate:true}}
        )
  }

  ngOnInit(): void 
  {
    this.fetchData()
  }

  editRecipe = ( modifiedRecipe: Recipe ) =>
  {
    this.recipeService.request
      .send<Recipe>('recipe/edit',modifiedRecipe,'put')
      .then( this.confirm )
      .then( this.recipeService.reloadDependencies )
  }

  confirm = () =>{
    this.close()
  }

}