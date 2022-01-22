import { ResolvedIngredient} from './Ingredient'
import { ResolvedUnit } from './Unit'
import {Ingredient} from './Ingredient'

export type Recipe = {
    _id: string,
    description: string,
    name: string,
    ingredients: Ingredient[],
    createdAt: string,
    updatedAt: string,
}

export type RecipeIngredientFormData = {
    data:{
        ingredients:ResolvedIngredient[],
        units:ResolvedUnit[]
    }
}