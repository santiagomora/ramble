const {Url} = require( config( 'path.models' ) );

function append_url( {request,found} ){
    if( found )
        request.body.found_url = found;
    return found ? false : true;
}

function preformat_id( data ){
    return data.match(/^\d+$/gi)
        ? data
        : -1;
}

module.exports = {
    url_id:{
        exists:{
            model:Url.model,
            field:'url_id',
            on_success: append_url,
            preformat:preformat_id
        }
    }
}
