const {Expense} = require( config('path.models') );

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
function filterByMonthYear({month,year})
{
    const monthFilter = month ? [{"$eq": [{ "$month": "$date" }, parseInt(month)]}] : [];
    const yearFilter =year ? [{"$eq": [{ "$year": "$date" }, parseInt(year)]}] : [];
    return (month||year)
        ? {
            "$expr": {
                "$and": [...yearFilter,...monthFilter]
            }
        }
        : {};
}

async function getExpenses( queryObj,{skip,limit,month,year} )
{
    const pagination = buildPagination({skip,limit});
    const dateFilter = filterByMonthYear({month,year});
    const query = {...queryObj,...dateFilter};
    const total = await countModel(query,Expense);
    const data = await genericIndex(pagination,query,Expense)
    return {data,pagination:{...pagination,total}}
}

async function addExpense( expense )
{
    const data = await genericDataAdd(Expense,expense)
    return data;
}


async function updateExpense( query,dataUpdate )
{
    const update = {...dataUpdate,updatedAt:new Date()}
    const data = await genericFindAndUpdate(Expense,query,update)
    return data;
}

module.exports = {addExpense,getExpenses,updateExpense};
