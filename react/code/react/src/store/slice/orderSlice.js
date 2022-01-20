import {createSlice} from '@reduxjs/toolkit'
import {calculateTotal} from '../../helper/helper'

const initialState = {total:0,items:[]}

const changeFromOrderReducer = (state,{payload}) =>
{
    const items = [...state.items]
    const {orderMod,prodData,itemIndex} = payload
    const {quantity} = orderMod;
    const order = {productData:prodData,orderData:orderMod}
    if (quantity>0)
        items[itemIndex] = order
    else 
        items.splice(itemIndex,1)
    return {total:calculateTotal(items),items}
}

const changeFromMenuReducer = (state,{payload}) => 
{
    const {data,quantity,selectedExtra} = payload
    const extTotal = selectedExtra.reduce((t,e) => e.price+t,0)
    const total = quantity*(data.price+extTotal)
    const orderData={
        name:data.name,
        prodId:data._id,
        quantity,
        selectedExtra,
        total
    };
    const items = quantity>0 
        ? [...state.items,{productData:data,orderData}] 
        : state.items
    return {items,total:calculateTotal(items)}
}

const deleteFromOrderReducer = (state,{payload}) => 
{
    const {itemIndex} = payload
    const items = [...state.items]
    items.splice(itemIndex,1)
    return {total:calculateTotal(items),items}
}

const setOrderReducer = (state,{payload}) => 
{
    const {order} = payload
    const {total,items} = order
    return {total,items}
}

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        changeFromOrder: changeFromOrderReducer,
        itemDelete: deleteFromOrderReducer,
        changeFromMenu: changeFromMenuReducer,
        setOrder: setOrderReducer
    }
})

export default orderSlice;
