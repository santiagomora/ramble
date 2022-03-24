const {Url} = require( config( 'path.models' ) );

function append_url( {request,found} ){
    request.body.found_url = found;
    return false;
}

function valid_url( {request,addr} ){
    request.body.valid_url = addr;
    return addr ? false : true;
}

function preformat_url( url ){
    return url.replace( /^(http:\/\/|https:\/\/)/gi,'' ).toLowerCase();
}

module.exports = {
    url:{
        valid_url:{
            handle_domain:valid_url,
            preformat:preformat_url
        },
        unique:{
            model:Url.model,
            field:'url_name',
            preformat: preformat_url,
            on_success: append_url
        }
    }
}
