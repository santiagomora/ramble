import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/types';
import { RecipeService } from 'src/services';
import { SubscriptionManager } from 'src/utils';
import { recipeViewSubscriptions } from './subscriptions/recipe-view.subscription';

@Component({
  selector: 'recipe-view',
  templateUrl:'./templates/recipe-view.template.html'
})
export class RecipeViewComponent implements OnInit, OnDestroy
{
  currentRecipe: Recipe;

  private recipeId: string;

  private initial: boolean = true;

  public loading : boolean = true;

  private subscriptionManager: SubscriptionManager<RecipeViewComponent> = new SubscriptionManager<RecipeViewComponent>( this,recipeViewSubscriptions )
  
  constructor( 
    public route: ActivatedRoute,
    public recipeService: RecipeService ) {}
  
  fetchData()
  {
    if (this.recipeId)
    {
      this.loading = true;
      this.recipeService.fetchData(
        `recipe/${this.recipeId}`,
        this.subscriptionManager.get('fetchSingleRecipe'),
        {}
      )
    }
  }
  
  ngOnInit(): void 
  {
    this.initial = false;
    this.fetchData()
  }

  ngOnDestroy()
  {
    this.subscriptionManager.destroy()
  }
}
