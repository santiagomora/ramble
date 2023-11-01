const {CartItem,Unit} = require( config('path.models') );

const {genericQueryHelper} = require( config('path.helper') );

function CartItemQueries( genericQueryHelper )
{
    this.getCartItems = async function( query,{skip,limit} )
    {
        const populate = {path:'unit',model: 'Unit'}
        const pagination = genericQueryHelper.buildPagination({skip,limit});
        const total = await genericQueryHelper.countModel(query,CartItem);
        const data = await genericQueryHelper.genericIndex(pagination,query,CartItem,{createdAt:-1},populate)
        return {data,pagination:{...pagination,total}}
    }
    
    this.addCartItem = async function( cartItem )
    {
        const data = await genericQueryHelper.genericDataAdd(CartItem,cartItem)
        return data;
    }
    
    this.getSingleCartItem = async function( itemQuery )
    {
        const populate = { path:'unit',model: 'Unit'}
        const data = await genericQueryHelper.genericFind(CartItem,itemQuery,populate)
        return data;
    }
    
    this.getFormData = async function( query )
    {
        const units = await genericQueryHelper.getAll(query,Unit)
        return {units}
    }
    
    this.updateExistingCartItem = async function(query,updatedData)
    {
        const data = await genericQueryHelper.genericFindAndUpdate(CartItem,query,updatedData)
        return data
    }
    
    this.deleteCartItem = async function(query)
    {
        const data = await genericQueryHelper.genericFindAndDelete(query,CartItem)
        return data
    }
}

module.exports = new CartItemQueries( genericQueryHelper );
