const {Server} = require( config('path.models') );

const {
    genericIndex,
    genericDataAdd,
    countModel,
    buildPagination,
    genericFindAndUpdate
} = require( config( 'path.helper' ) ).genericQueryHelper;

async function getServers( query,{skip,limit} )
{
    const pagination = buildPagination({skip,limit});
    const total = await countModel(query,Server);
    const data = await genericIndex(pagination,query,Server,{createdAt:-1})
    return {data,pagination:{...pagination,total}}
}

async function addServer( server )
{
    const data = await genericDataAdd(Server,server)
    return data;
}

async function updateServer( query,updatedData )
{
    const data = await genericFindAndUpdate(Server,query,updatedData)
    return data;
}


module.exports = {addServer,updateServer,getServers};
