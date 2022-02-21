import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { RecipeModel } from 'src/models';
import { Recipe, RecipeOpener } from 'src/types';
import { SubscriptionManager } from 'src/utils';
import { RecipeService } from '../../services/recipe.service';
import { recipeViewSubscriptions } from './subscriptions/recipe-view.subscription';

@Component({
  selector: 'recipe-view',
  templateUrl:'./templates/recipe-view.template.html'
})
export class RecipeViewComponent implements OnInit, OnDestroy, RecipeOpener
{
  currentRecipe: RecipeModel;

  private recipeId: string;

  private initial: boolean = true;

  public loading : boolean = true;

  private subscriptionManager: SubscriptionManager<RecipeViewComponent> = new SubscriptionManager<RecipeViewComponent>( this,recipeViewSubscriptions )
  
  constructor( 
    public simpleModalService: SimpleModalService,
    public router: Router,
    public route: ActivatedRoute,
    public recipeService: RecipeService ) 
  {}
  
  fetchData()
  {
    if (this.recipeId)
    {
      this.loading = true;
      this.recipeService
        .request
        .fetch<Recipe>(
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
