import { ItemModel } from "src/models";
import { Item } from "./Item";

export type Ingredient = {
    item: Item,
    quantity:Number
}

export type CastedIngredient = {
    item: ItemModel,
    quantity:Number
}