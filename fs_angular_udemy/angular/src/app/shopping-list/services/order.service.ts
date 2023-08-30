import { Injectable } from "@angular/core";
import { RequestService } from "src/services";
import { Item, Order, OrderItem } from "src/types";
import { ShoppingService } from "./shopping.service";

@Injectable()
export class OrderService
{
    private _items: OrderItem[] = [];

    constructor(
        private shoppingService : ShoppingService,
        private requestService : RequestService )
    {}

    get request():RequestService
    {
        return this.requestService
    }

    get orderItems(): OrderItem[]
    {
        return this._items
    }

    addToCart = ( orderItem: OrderItem ) => 
    {
      let hasItem = false
      const {item} = orderItem 
      this._items = this._items.map( 
        e => 
        {
          const found = e.item._id === item._id
          hasItem = !hasItem && found || hasItem
          return found 
            ? {...e,quantity:e.quantity+orderItem.quantity} 
            : e
        }
      )
      if(!hasItem)
        this._items = [...this._items,orderItem]
    }

    addItemsToCart = ( items: OrderItem[] ) => {
      for(let i =0; i<items.length; i++){
        this.addToCart(items[i])
      }
    }
  
    deleteFromCart = ( position:number ) => 
    {
      this._items.splice(position,1);
    }
  
    deleteOrder = () => 
    {
      this._items = [];
    }


    createOrder( order )
    {
      this.request.send('order',order).then( this.deleteOrder )
    }
}