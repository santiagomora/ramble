import { ItemModel } from "src/models"
import { Item } from "./Item"

export type Order = {
    _id?: string,
    userId?: string
    createdAt? : string,
    updatedAt?: string,
    items: OrderItem[]|string[]
}

export type OrderItemModel = {
    _id: string,
    item: ItemModel,
    quantity: number
}

export type OrderItemModelWithoutItems = {
    _id: string,
    item: string,
    quantity: number
}

export type CastedOrder = {
    _id:string,
    createdAt : Date,
    updatedAt: Date,
    userId: string,
    items: OrderItemModel[]
}

export type CastedOrderWithoutItems = {
    _id:string,
    createdAt : Date,
    updatedAt: Date,
    userId: string,
    items: OrderItemModelWithoutItems[]
}

export type OrderItem = {
    _id?:string,
    createdAt? : string,
    updatedAt?: string,
    item: Item,
    quantity: number,
    orderId?: Order
}

export type CastedOrderItem = {
    _id?:string,
    createdAt? : Date,
    updatedAt?: Date,
    item: ItemModel,
    quantity: number,
    orderId: any//OrderModel
}