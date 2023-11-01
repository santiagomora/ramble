const {Server} = require( config('path.models') );

const {genericQueryHelper} = require( config('path.helper') );

function ServerQueries(genericQueryHelper)
{
    this.getServers = async function( query,{skip,limit} )
    {
        const pagination = genericQueryHelper.buildPagination({skip,limit});
        const total = await genericQueryHelper.countModel(query,Server);
        const data = await genericQueryHelper.genericIndex(pagination,query,Server,{createdAt:-1})
        return {data,pagination:{...pagination,total}}
    }
    
    this.addServer = async function( server )
    {
        const data = await genericQueryHelper.genericDataAdd(Server,server)
        return data;
    }
    
    this.updateServer = async function( query,updatedData )
    {
        const data = await genericQueryHelper.genericFindAndUpdate(Server,query,updatedData)
        return data;
    }
    
    this.deleteServer = async function( query )
    {
        const data = await genericQueryHelper.genericFindAndDelete(query,Server)
        return data
    }
}


module.exports = new ServerQueries(genericQueryHelper);
