import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionManager } from 'src/utils';
import { RecipeService } from 'src/services';
import { Recipe } from 'src/types';
import { recipeEditSubscriptions } from './subscriptions/recipe-edit.subscription';

@Component({
  selector: 'edit-recipe',
  templateUrl:'./templates/edit-recipe.template.html'
})
export class EditRecipeComponent implements OnInit 
{  
  currentRecipe: Recipe;

  private recipeId: string;

  loading:boolean = true;

  initial: boolean = true;

  private subscriptionManager: SubscriptionManager<EditRecipeComponent> = new SubscriptionManager<EditRecipeComponent>( this,recipeEditSubscriptions )

  constructor(
    private route: ActivatedRoute,
    public recipeService: RecipeService ) {}

  fetchData = () =>
  {
    if (this.recipeId)
    {
      this.recipeService.fetchData(
        `recipe/${this.recipeId}`,
        this.subscriptionManager.get('fetchSingleRecipe'),
        {}
      )
    }
  }

  ngOnInit(): void 
  {
    this.fetchData()
  }

  editRecipe = ( modifiedRecipe: Recipe ) =>
  {
    this.recipeService.sendRecipe('recipe/edit',modifiedRecipe,"put")
  }

}