const {Order} = require( config('path.models') );

const {genericQueryHelper} = require( config('path.helper') );

function OrderQueries( genericQueryHelper )
{
    this.getOrders = async function( query,{skip,limit} )
    {
        /*const populate = { 
            path:'items',
            model: 'CartItem',
            populate:{ 
                path:'unit',
                model: 'Unit'
            }
        }*/
        const pagination = genericQueryHelper.buildPagination({skip,limit});
        const total = await genericQueryHelper.countModel(query,Order);
        const data = await genericQueryHelper.genericIndex(pagination,query,Order,{createdAt:-1})//,populate)
        return {data,pagination:{...pagination,total}}
    }
    
    this.addOrder = async function( order )
    {
        const data = await genericQueryHelper.genericDataAdd(Order,order)
        return data;
    }
    
    this.getSingleOrder = async function( orderQuery )
    {
        const populate = { 
            path:'items.item',
            model: 'CartItem',
            populate:{ 
                path:'unit',
                model: 'Unit'
            }
        }
        const data = await genericQueryHelper.genericFind(Order,orderQuery,populate)
        return data;
    }

    this.deleteOrder = async function(query)
    {
        const data = await genericQueryHelper.genericFindAndDelete(query,Order)
        return data
    }
}

module.exports = new OrderQueries( genericQueryHelper );
