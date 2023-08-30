import { Injectable } from "@angular/core";
import { RequestService } from "src/services";
import { Ingredient } from "src/types";

@Injectable()
export class ShoppingService
{
    private items: Ingredient[] = [];

    constructor( 
        private requestService: RequestService )
    {}

    get _items(): Ingredient[]
    {
        return this.items
    }

    set _items( items: Ingredient[] )
    {
        this.items = items;
    } 

    addToCart = ( item: Ingredient ) => 
    {
      this.items = [...this.items,item]
    }
  
    deleteFromCart = ( id:number ) => 
    {
      this.items.splice(id,1);
    }
  
    deleteOrder = () => 
    {
      this.items = [];
    }

    get fetch()
    {
        return this.requestService.fetch
    }

    get delete()
    {
        return this.requestService.delete
    }

    get send()
    {
        return this.requestService.send
    }
}