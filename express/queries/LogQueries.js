const {Log} = require( config('path.models') );

const {genericQueryHelper} = require( config('path.helper') );

function LogQueries(genericQueryHelper)
{
    this.getLogs = async function( query,{skip,limit} )
    {
        const pagination = genericQueryHelper.buildPagination({skip,limit});
        const total = await genericQueryHelper.countModel(query,Log);
        const data = await genericQueryHelper.genericIndex(pagination,query,Log,{createdAt:-1})
        return {data,pagination:{...pagination,total}}
    }
    
    this.addLog = async function( log )
    {
        const data = await genericQueryHelper.genericDataAdd(Log,log)
        return data;
    }
}

module.exports = new LogQueries(genericQueryHelper);
