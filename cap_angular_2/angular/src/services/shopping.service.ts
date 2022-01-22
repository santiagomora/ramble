import { Ingredient } from "src/types";

export class ShoppingService
{
    private items: Ingredient[] = [];

    constructor(){}

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

}