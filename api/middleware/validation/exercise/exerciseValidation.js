const mongoose = require('mongoose');

const {User} = require( config( 'path.models' ) );

function append_username( {request,found} ){
    if (found)
        request.body.found_user = found;
    return found ? false : true;
}

function preformat_id( data ){
    return mongoose.Types.ObjectId.isValid( data )
        ? data
        : new mongoose.Types.ObjectId();
}

module.exports = {
    userId:{
        required:true,
        exists:{
            model:User.model,
            field:'_id',
            on_success: append_username,
            preformat:preformat_id
        }
    },
    description:{
        required:true
    },
    duration:{
        required:true,
        integer:true
    },
    date:{
        date:true
    }
}
