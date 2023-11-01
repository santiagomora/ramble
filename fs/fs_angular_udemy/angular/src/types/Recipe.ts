import { CastedIngredient } from "./Ingredient"
import { Item } from "./Item"

export type Recipe = {
    _id: string,
    description: string,
    name: string,
    ingredients: any[],
    createdAt: string,
    updatedAt: string,
}

export type CastedRecipe = {
    _id?:string,
    userId?:String,
    description:String,
    name:String,
    price:Number,
    brand:String,
    ingredients:CastedIngredient[],
    createdAt?:Date,
    updatedAt?:Date
}

export type RecipeFormData = {
    items:Item[]
}