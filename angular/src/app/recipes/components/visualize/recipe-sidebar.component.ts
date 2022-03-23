import { Component, OnInit } from '@angular/core';
import { SubscriptionManager } from 'src/utils';
import { PaginatedData, Pagination, Recipe } from 'src/types';
import { recipeSidebarSubscriptions } from './subscriptions/recipe-sidebar.subscription';
import { RecipeService } from '../../services/recipe.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { AddRecipeComponent } from '../edit-add/add-recipe.component';

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

  constructor( 
    public simpleModalService : SimpleModalService,
    public recipeService: RecipeService )
  {}

  fetchData = ( query = {skip:0,limit:2} ) => 
  {
    this.recipeService
      .request
      .fetch<PaginatedData<Recipe>>(
        'recipe',
        this.subscriptionManager.get('fetchPaginatedRecipes'),
        {query}
      )
  }

  addRecipe()
  {
    const disposable = this.simpleModalService
      .addModal(AddRecipeComponent)
      .subscribe( 
          (isConfirmed) => 
          {
              if(isConfirmed)
              {
                  opener.fetchData()
              }
              disposable.unsubscribe() 
          }
      );
  }

  ngOnInit()
  {
    this.fetchData()
  }
}
