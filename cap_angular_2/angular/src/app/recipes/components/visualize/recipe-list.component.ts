import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionManager } from 'src/utils';
import { HttpService, RecipeService } from 'src/services';
import { recipeListSubscriptions } from './subscriptions/recipe-list.subscription';
import { Pagination, Recipe } from 'src/types';

@Component({
  selector: 'recipe-list',
  templateUrl:'./templates/recipe-list.template.html'
})
export class RecipeListComponent implements OnInit
{
  public recipes: Recipe[];

  public pagination: Pagination;

  public loading: boolean = true; 
  
  private subscriptionManager: SubscriptionManager<RecipeListComponent> = new SubscriptionManager<RecipeListComponent>( this,recipeListSubscriptions )
  
  constructor( public recipeService: RecipeService ) {}

  fetchData = ( options = {limit:4,skip:0} ) =>
  {
    this.loading = true;
    this.recipeService.fetchData(
      'recipe',
      this.subscriptionManager.get('fetchPaginatedRecipes'),
      {query:options}
    )
  }

  ngOnInit(): void 
  {
    this.fetchData()
  }

}
