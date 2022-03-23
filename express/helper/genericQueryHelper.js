const mgs = require( 'mongoose' );

function GenericQueryHelper( 
    mongoose )
{

    this.buildPagination = function( {limit,skip} ){
        const intLimit = parseInt(limit||8)
        const intSkip = parseInt(skip||0)
        return {
            limit: intLimit,
            skip: intLimit*intSkip
        };
    }
    
    this.countModel = function(filters,model)
    {
        return new Promise(
            (resolve,reject) =>
            {
                model.countDocuments(
                    filters||{},
                    function(err, c)
                    {
                        if(err)
                            reject(err)
                        resolve(c)
                    }
                );
            }
        ).catch(er => console.error(er))
    }
    
    this.genericDataAdd = function(model,data)
    {
        return new Promise(
            (resolve,reject) =>
            {
                model.create(
                    data,
                    function ( err,doc )
                    {
                        if (err)
                            reject(err);
                        resolve(doc);
                    }
                );
            }
        ).catch(
            e =>
            {
                console.error(e)
                return {error:"An error ocurred when inserting into database"};
            }
        );
    }
    
    this.genericIndex = function(pagination,query,model,sort={},populate = null)
    {
        return new Promise(
            ( resolve,reject ) =>
            {
                const cb = function( err,data )
                {
                    if( err )
                        reject( err )
                    resolve( data )
                }
                const agg = populate 
                    ? model.find(query,null,pagination,cb).sort(sort).populate(populate)
                    : model.find(query,null,pagination,cb).sort(sort);
            }
        ).catch(
            e =>
            {
                console.error(e);
                return {error:"An error ocurred when querying database"};
            }
        )
    }
    
    
    this.getAll = function(query,model,sort={},populate = null)
    {
        return new Promise(
            ( resolve,reject ) =>
            {
                const cb = function( err,data )
                {
                    if( err )
                        reject( err )
                    resolve( data )
                }
    
                const agg = populate 
                    ? model.find(query,cb).sort(sort).populate(populate)
                    : model.find(query,cb).sort(sort);
            }
        ).catch(
            e =>
            {
                console.error(e);
                return {error:"An error ocurred when querying database"};
            }
        )
    }
    
    this.genericFind = function(model,query,populate = null)
    {
        return new Promise(
            ( resolve,reject ) =>
            {
                const cb = function( err,data )
                {
                    if( err )
                        reject( err )
                    resolve( data )
                }
                const agg = populate 
                    ? model.find(query,cb).populate(populate)
                    : model.find(query,cb);
            }
        ).catch(
            e =>
            {
                console.error( e );
                return {error:"An error ocurred when querying into database"};
            }
        )
    }
    
    
    this.genericFindAndUpdate = function(model,query,updatedData)
    {
        return new Promise(
            ( resolve,reject ) =>
            {
                const agg = model.findOneAndUpdate(
                    query,
                    updatedData,
                    {new:true},
                    function( err,data )
                    {
                        if( err || !data )
                           reject( err )
                        resolve( data )
                    }
                );
           }
        ).catch(
            e =>
            {
                console.error( e );
                return {error:"An error ocurred when updating database"};
            }
        )
    }
    
    this.genericFindAndDelete = function(query,model)
    {
        return new Promise(
            ( resolve,reject ) =>
            {
                const agg = model.deleteOne(
                    query,
                    function( err,data )
                    {
                        if( err || !data )
                           reject( err )
                        resolve( query._id )
                    }
                );
           }
        ).catch(
            e =>
            {
                console.error( e );
                return {error:"An error ocurred when updating database"};
            }
        )
    }
}

module.exports = new GenericQueryHelper(mgs)
