const {User} = require( config('path.models') );

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

module.exports = {getSingleUser};
