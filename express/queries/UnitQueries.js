const {Unit} = require( config('path.models') );

const {genericQueryHelper} = require( config('path.helper') );

function UnitQueries(genericQueryHelper)
{
    this.deleteUnit = async function( query )
    {
        const data = await genericQueryHelper.genericFindAndDelete(query,Unit)
        return data
    }
    
    this.updateExistingUnit = async function( query,updatedData )
    {
        const data = await genericQueryHelper.genericFindAndUpdate(Unit,query,updatedData)
        return data
    }
    
    this.getUnits = async function(query,{skip,limit})
    {
        const pagination = genericQueryHelper.buildPagination({skip,limit});
        const total = await genericQueryHelper.countModel(query,Unit);
        const data = await genericQueryHelper.genericIndex(pagination,query,Unit,{createdAt:-1})
        return {data,pagination:{...pagination,total}}
    }
    
    this.addUnit = async function(unit)
    {
        const data = await genericQueryHelper.genericDataAdd(Unit,unit)
        return data;
    }
    
    this.getSingleUnit = async function(query)
    {
        const data = await genericQueryHelper.genericFind(Unit,query)
        return data
    }

}

module.exports = new UnitQueries(genericQueryHelper)
