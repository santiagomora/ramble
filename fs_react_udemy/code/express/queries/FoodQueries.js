const {Meal,Category,Order} = require( config('path.models') );

const {
    genericIndex,
    genericDataAdd,
    countModel,
    buildPagination,
    genericFindAndUpdate
} = require( config( 'path.helper' ) ).genericQueryHelper;

/*
 * database methods
 */
async function getMenu( queryObj,{skip,limit} )
{
    const populate = {
        path:'category',
        populate:{
            path: 'extras',
            model: 'Extra'
        }
    }
    const pagination = buildPagination({skip,limit});
    const total = await countModel(queryObj,Meal);
    const data = await genericIndex(pagination,queryObj,Meal,populate)
    return {data,pagination:{...pagination,total}}
}

async function getCategories( queryObj )
{
    const data = await genericIndex({},queryObj,Category)
    return {data}
}

async function addOrder( order )
{
    const data = await genericDataAdd(Order,order)
    return data;
}

module.exports = {getMenu,getCategories,addOrder};
