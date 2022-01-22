import { ResolvedUnit } from "./Unit"

export type UnresolvedIngredient = {
    name: string,
    quantity: number, 
    unit: string
}

export type ResolvedIngredient = {
    _id: string,
    name: string
}

export type Ingredient = {
    _id:string,
    ingredient: ResolvedIngredient,
    quantity: number,
    unit: ResolvedUnit
}