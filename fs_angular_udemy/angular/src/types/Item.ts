import { UnitModel } from "src/models";
import { Unit,ResolvedUnit } from "./Unit";

export type Item = {
    _id?:string,
    userId:String,
    description:String,
    name:String,
    price:Number,
    brand:String,
    unit?:Unit,
    createdAt?:string,
    updatedAt?:string
}

export type CastedItem = {
    _id?:string,
    userId?:String,
    description:String,
    name:String,
    price:Number,
    brand:String,
    unit:UnitModel,
    createdAt?:Date,
    updatedAt?:Date
}

export type ItemFormData = {
    data:{
        units:ResolvedUnit[]
    }
}
