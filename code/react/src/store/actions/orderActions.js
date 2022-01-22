import {orderSlice} from '../slice/slice'

const orderActions = orderSlice.actions

const fetchOnMountAction = () => 
{
    return function(dispatch)
    {
        const order = localStorage.getItem('order')
        if (order)
            dispatch(orderActions.setOrder({order:JSON.parse(order)}))
    }
}

const storeOrderAction = (order) => 
{
    return function()
    {
        if (order.items.length>0)
            localStorage.setItem('order',JSON.stringify(order))
    }
}

const flushOrderAction = () => 
{
    return function(dispatch)
    {
        localStorage.removeItem('order')
        dispatch(orderActions.setOrder({order:{items:[],total:0}}))
    }
}

export default {...orderActions,fetchOnMountAction,storeOrderAction,flushOrderAction}