import { Router } from "@angular/router";
import { SimpleModalService } from "ngx-simple-modal";
import { AddRecipeComponent } from "src/app/recipes/components/edit-add/add-recipe.component";
import { EditRecipeComponent } from "src/app/recipes/components/edit-add/edit-recipe.component";
import { RecipeService } from "src/app/recipes/services/recipe.service";
import { castModel } from "src/helper/castModel";
import { ActionDescriptor, CastedRecipe, Ingredient, Recipe, RecipeOpener } from "src/types";
import { ItemModel } from "./item.model";

const cast = {
    createdAt: (date:string) => new Date(date),
    updatedAt: (date:string) => new Date(date),
    ingredients: (ingredients:Ingredient[]) => ingredients.map( ({item,quantity}) => ({item:new ItemModel(item),quantity}) )
}


export class RecipeModel
{
    private casted : CastedRecipe

    private original : Recipe

    constructor( recipe: Recipe )
    {
        this.original = recipe;
        this.casted = castModel<CastedRecipe>(recipe,cast)
    }

    get data() : CastedRecipe
    {
        return this.casted
    }

    actions( opener : RecipeOpener ) : {[key:string]:ActionDescriptor[]}
    {
        return {
            'crud':[
                {
                    type:"button",
                    name:"delete",
                    action: (recipe : Recipe) => opener.recipeService.request.delete(`recipe/${recipe._id}`).finally( () => opener.fetchData() ),
                    classes:["btn","px-2","py-0","btn-danger","mr-2","small","font-weight-bolder"],
                    data: this.data
                },
                {
                    type:"button",
                    action: RecipeModel.staticActions(opener,this.data._id)['createEditRecipe'],
                    name:"edit",
                    classes:["btn","px-2","py-0","btn-success","mr-2","font-weight-bolder","small"],
                    data: this.data
                },{
                    type:"action",
                    url:'shopping-list',
                    name:"shop ingredients",
                    behavior: {
                        state:{
                            items:this.original.ingredients.map( ({item,quantity}) => ({item,quantity})) 
                        }
                    },
                    classes:["btn","px-2","py-0","btn-info","mr-2","small","font-weight-bolder"],
                    data: this.data
                }
            ],
        }
    }

    static staticActions( 
        opener: RecipeOpener,
        recipeId : string ) 
    {
        return {
            'createEditRecipe': () => 
            {
                const component = recipeId 
                    ? EditRecipeComponent
                    : AddRecipeComponent
                const data = recipeId 
                ? {recipeId} 
                : {}
                const disposable = opener
                    .simpleModalService
                    .addModal(component,data)
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
        }
    }
}