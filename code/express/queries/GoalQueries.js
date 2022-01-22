const {Goal} = require( config('path.models') );

const {
    genericIndex,
    genericFind,
    genericDataAdd,
    countModel,
    buildPagination,
    genericFindAndUpdate
} = require( config( 'path.helper' ) ).genericQueryHelper;
/*
 * database methods
 * */
async function getGoals( queryObj,{skip,limit} )
{
    const pagination = buildPagination({skip,limit});
    const total = await countModel(queryObj,Goal);
    const data = await genericIndex(pagination,queryObj,Goal)
    return {data,pagination:{...pagination,total}}
}

async function addGoal( goal )
{
    const data = await genericDataAdd(Goal,goal)
    return data;
}

async function updateGoal( query,dataUpdate )
{
    const update = {...dataUpdate,updatedAt:new Date()}
    const data = await genericFindAndUpdate(Goal,query,update)
    return data;
}

module.exports = {addGoal,getGoals,updateGoal};
