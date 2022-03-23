const {User,ExpiredToken} = require( config('path.models') );

const {genericQueryHelper} = require( config('path.helper') );

function AuthQueries( genericQueryHelper )
{
    
    this.getSingleUser = async function( userQuery )
    {
        const data = await genericQueryHelper.genericFind(User,userQuery)
        return data;
    }
    
    this.registerUser = async function( userData )
    {
        const data = await genericQueryHelper.genericDataAdd(User,userData)
        return data;
    }
    
    this.checkTokenExpired = async function( tokenData )
    {
        const data = await genericQueryHelper.genericFind(ExpiredToken,tokenData)
        return data;
    }
    
    this.addExpiredtoken = async function( tokenData )
    {
        const data = await genericQueryHelper.genericDataAdd(ExpiredToken,tokenData)
        return {data};
    }
}


module.exports = new AuthQueries(genericQueryHelper);
