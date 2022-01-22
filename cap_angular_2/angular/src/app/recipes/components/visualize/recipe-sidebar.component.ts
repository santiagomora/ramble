import { Component, OnInit } from '@angular/core';
import { SubscriptionManager } from 'src/utils';
import { Pagination, Recipe } from 'src/types';
import { recipeSidebarSubscriptions } from './subscriptions/recipe-sidebar.subscription';
import { RecipeService } from 'src/services';

@Component({
  selector: 'recipe-sidebar',
  templateUrl: './templates/recipe-sidebar.template.html'
})
export class RecipeSidebarComponent implements OnInit
{
  recipes: Recipe[];

  loading:boolean = true;

  pagination: Pagination;

  private subscriptionManager: SubscriptionManager<RecipeSidebarComponent> = new SubscriptionManager<RecipeSidebarComponent>( this,recipeSidebarSubscriptions )

  constructor( public recipeService: RecipeService ){}

  fetchData = ( options = {skip:0,limit:4} ) => 
  {
    this.recipeService.fetchData(
      'recipe',
      this.subscriptionManager.get('fetchPaginatedRecipes'),
      {query:options}
    )
  }

  ngOnInit()
  {
    this.fetchData()
  }
}
