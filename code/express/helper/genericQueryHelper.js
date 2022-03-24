const mongoose = require( 'mongoose' );

function buildPagination( {limit,skip} ){
    const intLimit = parseInt(limit||8)
    const intSkip = parseInt(skip||0)
    return {
        limit: intLimit,
        skip: intLimit*intSkip
    };
}

function countModel(filters,model)
{
    return new Promise(
        (resolve,reject) =>
        {
            model.count(
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

function genericDataAdd(model,data)
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

function genericIndex(pagination,query,model,populate = null)
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
                ? model.find(query,null,pagination,cb).populate(populate)
                : model.find(query,null,pagination,cb);
        }
    ).catch(
        e =>
        {
            console.error(e);
            return {error:"An error ocurred when querying database"};
        }
    )
}

function genericFind(model,query)
{
    return new Promise(
        ( resolve,reject ) =>
        {
            const agg = model.find(
                query,
                function( err,data )
                {
                    if( err )
                        reject( err )
                    resolve( data )
                }
            );
        }
    ).catch(
        e =>
        {
            console.error( e );
            return {error:"An error ocurred when querying into database"};
        }
    )
}


function genericFindAndUpdate(model,query,updatedData)
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

module.exports = {
    genericIndex,
    genericDataAdd,
    countModel,
    buildPagination,
    genericFindAndUpdate,
    genericFind
}
