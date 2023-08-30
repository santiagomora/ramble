import { Component, OnInit } from '@angular/core';
import { SubscriptionManager } from 'src/utils';
import { recipeListSubscriptions } from './subscriptions/recipe-list.subscription';
import { PaginatedData, Pagination, Recipe, RecipeOpener } from 'src/types';
import { RecipeService } from '../../services/recipe.service';
import { RecipeModel } from 'src/models';
import { SimpleModalService } from 'ngx-simple-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'recipe-list',
  templateUrl:'./templates/recipe-list.template.html'
})
export class RecipeListComponent implements OnInit,RecipeOpener
{
  public recipes: RecipeModel[];

  public pagination: Pagination;

  public loading: boolean = true; 
  
  private subscriptionManager: SubscriptionManager<RecipeListComponent> = new SubscriptionManager<RecipeListComponent>( this,recipeListSubscriptions )
  
  constructor( 
    public simpleModalService: SimpleModalService,
    public router: Router,
    public recipeService: RecipeService ) 
  {}

  fetchData = ( query = {limit:4,skip:0} ) =>
  {
    this.loading = true;
    this.recipeService
      .request
      .fetch<PaginatedData<Recipe>>(
        'recipe',
        this.subscriptionManager.get('fetchPaginatedRecipes'),
        {query}
      )
  }

  ngOnInit(): void 
  {
    this.fetchData()
  }

}
