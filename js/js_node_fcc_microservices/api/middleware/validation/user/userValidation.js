const {User} = require( config( 'path.models' ) );

function append_username( {request,found} ){
    if (found)
        request.body.found_user = found;
    return found ? true : false;
}

function preformat_username( username ){
    return username.toLowerCase();
}

module.exports = {
    username:{
        required:true,
        unique:{
            model:User.model,
            field:'user_username',
            preformat: preformat_username,
            on_success: append_username
        }
    }
}
