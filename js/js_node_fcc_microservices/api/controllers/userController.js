const mongoose = require( 'mongoose' );

const {User} = require( config( 'path.models' ) );


const {find_users,create_user} = User.methods;

async function handle_create_user( req,res ){
    const {username,found_user} = req.body;
    const user = await create_user( {username} );
    return res.status(200).json( user );
}

async function get_users( req,res ){
    const found_users = await find_users( {query:{},select:null,options:{}} );
    return res.status( 200 ).json( found_users );
}

module.exports = {
    handle_create_user,
    get_users
};
