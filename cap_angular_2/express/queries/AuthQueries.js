const {User,ExpiredToken} = require( config('path.models') );

const {
    genericIndex,
    genericDataAdd,
    countModel,
    buildPagination,
    genericFind,
    genericFindAndUpdate
} = require( config( 'path.helper' ) ).genericQueryHelper;

/*
 * database methods
 */
async function getSingleUser( userQuery )
{
    const data = await genericFind(User,userQuery)
    return data;
}

async function registerUser( userData )
{
    const data = await genericDataAdd(User,userData)
    return data;
}

async function checkTokenExpired( tokenData )
{
    const data = await genericFind(ExpiredToken,tokenData)
    return data;
}

async function addExpiredtoken( tokenData )
{
    const data = await genericDataAdd(ExpiredToken,tokenData)
    return {data};
}

module.exports = {getSingleUser,registerUser,checkTokenExpired,addExpiredtoken};
