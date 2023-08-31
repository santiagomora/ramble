const mongoose = require('mongoose');

const {User} = require( config( 'path.models' ) );

function append_user( {request,found} ){
    request.body.found_user = found;
    return false;
}

function preformat_id( data ){
    return mongoose.Types.ObjectId.isValid( data )
        ? data
        : new mongoose.Types.ObjectId();
}

function check_date( req,data ){
    const {date} = req.body;
    const check_date = typeof date !== 'undefined'
        ? new Date( date )
        : new Date();
    req.body.date = check_date;
    return false;
}

module.exports = {
    userId:{
        required:true,
        exists:{
            model:User.model,
            field:'_id',
            on_success: append_user,
            preformat:preformat_id
        }
    },
    from:{
        date:{
            check:check_date
        }
    },
    to:{
        date:{
            check:check_date
        }
    },
    limit:{
        positive:true,
        integer:true
    }
}
