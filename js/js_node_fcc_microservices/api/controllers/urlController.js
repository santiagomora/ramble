const {Url} = require( config( 'path.models' ) );

const {format_response_url} = Url.format;

const {find_one_url,create_url} = Url.methods;

function build_response({res,ret_val}){
    const {status,data} = ret_val;
    return status === 301
        ? res.status( status ).redirect(
            data.original_url.match(/^(http|https):\/\//gi)
                ? data.original_url
                : `http://${data.original_url}`
        )
        : res.status( status ).json( data );
}

async function create_valid_url({req}){
    const {found_url,valid_url} = req.body;
    const new_url = found_url
        ? found_url
        : await create_url({url_name:valid_url});
    new_url.url_name = req.body.url;
    return format_response_url( new_url );
}

async function handle_create_url( req,res ){
    const {valid_url} = req.body;
    const ret_val = {
        data:await create_valid_url( {req} ),
        status:200
    };
    return build_response({res,ret_val});
}

async function handle_find_url( req,res ){
    const {url_id} = req.params;
    const {found_url} = req.body;
    const ret_val = {
        data: format_response_url( found_url ),
        status: 301
    };
    return build_response({res,ret_val});
}

module.exports = {
    handle_create_url,
    handle_find_url
};
