const {Log} = require( config('path.models') );

const {
    genericIndex,
    genericDataAdd,
    countModel,
    buildPagination
} = require( config( 'path.helper' ) ).genericQueryHelper;


async function getLogs( query,{skip,limit} )
{
    const pagination = buildPagination({skip,limit});
    const total = await countModel(query,Log);
    const data = await genericIndex(pagination,query,Log,{createdAt:-1})
    return {data,pagination:{...pagination,total}}
}

async function addLog( log )
{
    const data = await genericDataAdd(Log,log)
    return data;
}

module.exports = {addLog,getLogs};
