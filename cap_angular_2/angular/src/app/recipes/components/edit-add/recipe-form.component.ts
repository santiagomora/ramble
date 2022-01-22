import { Component, Input, OnInit } from '@angular/core';
import { RecipeFormControl } from './forms/recipe.form';
import { SubscriptionManager } from 'src/utils';
import { RecipeService } from 'src/services';
import { Recipe } from 'src/types';

import {recipeFormSubscriptions} from './subscriptions/recipe-form.subscription'

@Component({
  selector: 'recipe-form',
  templateUrl:'./templates/recipe-form.template.html'
})
export class RecipeFormComponent implements OnInit {

  @Input() isEdit: boolean = false;

  @Input() currentRecipe?: Recipe;

  @Input() submitHandler;

  loading:boolean = true;

  formControl: RecipeFormControl;

  private subscriptionManager: SubscriptionManager<RecipeFormComponent> = new SubscriptionManager<RecipeFormComponent>( this,recipeFormSubscriptions )

  constructor( public recipeService: RecipeService ) {}

  ngOnInit(): void 
  {
    this.recipeService.fetchData(
      'recipe/form',
      this.subscriptionManager.get('fetchFormData'),
      {}
    )
  }
  
  onSubmit( ev: Event )
  {
    this.submitHandler( 
      this.isEdit 
        ? {...this.formControl.value,_id:this.currentRecipe._id}
        : this.formControl.value
    )
  }

}