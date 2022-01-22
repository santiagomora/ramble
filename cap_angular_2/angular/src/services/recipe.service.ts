import { PlainHttpOptions, Recipe } from "src/types";
import { Injectable } from "@angular/core";
import { ShoppingService } from "./shopping.service";
import { Router } from "@angular/router";
import { HttpService } from "./http.service";
import { CommunicationService } from "./communication.service";

@Injectable()
export class RecipeService
{
    public recipeList = [];
    constructor( 
        private httpService: HttpService,
        private router: Router,
        public shoppingService: ShoppingService,
        public commService: CommunicationService ){}

    get _recipes(): Recipe[]
    {
        return this.recipeList
    }

    get intercom()
    {
        return this.commService.intercom
    }

    reloadDependencies = ( afterNotify: (data: any) => any ) : any => 
    {
        return (message) => 
        {
            if( message )
            {
                this.commService.notify('reloadRecipes').then( afterNotify(message) )
            }
        }
    }

    sendRecipe( endpoint: string, data: Recipe, requestType:"post"|"put" = "post")
    {
        this.httpService.prepareRequest(requestType)({
            endpoint,
            onRequestSuccess:this.reloadDependencies( 
                (response) => () => {
                    this.commService.pushMessage(response)
                    this.router.navigate(['/recipes',response.data._id])
                }
            ),
            data
        })
    }

    deleteRecipe(id: string)
    {
        this.httpService.prepareRequest("delete")({
            endpoint:`recipe/${id}`,
            onRequestSuccess:this.reloadDependencies(
                (response) => {
                    this.commService.pushMessage(response)
                    this.router.navigate(['/recipes'])
                }
            )
        })
    }

    fetchData = ( endpoint: string, subject,plainOptions : PlainHttpOptions ) =>
    {
        this.httpService.prepareRequest("get")({
            endpoint,
            onRequestSuccess:(data) => subject.next(data),
            plainOptions
        })
    }

    shopIngredients(itemId: number)
    {
        // let idPos : number,recipe: Recipe;
        // if ( (idPos = findById( itemId,this.recipeList ))>=0 )
        // {
        //     this.shoppingService._items = [
        //         ...this.shoppingService._items,
        //         ...this.recipeList[idPos].ingredients
        //     ];
        //     this.router.navigateByUrl('shopping-list');
        // }
    } 
}