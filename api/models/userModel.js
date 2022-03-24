const mongoose = require('mongoose');

const {build_user_log_query} = require( config( 'path.helper' ) ).queryHelper;

const {connection} = config( 'mongoose' );

const collection_name = 'users';

const {Schema} = mongoose;

const user_format_options = {
    getters:true,
    virtuals:true,
    aliases:true,
    transform: ( data,{_id,username}  ) => ({
        _id,username
    })
};

const user_schema = new Schema({
        user_username:{
            type:String,
            required:true,
            lowercase:true,
            index:{
                unique:true
            },
            alias:"username"
        },
        user_exercises:[{
            type:Schema.Types.ObjectId,
            ref:"Exercise"
        }]
    },{
        timestamps:{
            createdAt:'user_created_at',
            updatedAt:'user_updated_at'
        },
        toJSON:user_format_options,
        toObject:user_format_options
    }
);

const User = connection.model( 'User',user_schema,'users' );

/*
 * database methods
 */
function create_user({
    username
}){
    return new Promise(
        (resolve,reject) => {
            User.create(
                User.translateAliases( {username} ),
                function ( err,doc ){
                    if ( err )
                        throw err;
                    resolve(doc);
                }
            );
        }
    ).catch( e => console.error(e) );
}

function find_users( {query,select,options} ){
    return new Promise(
        ( resolve,reject ) => {
            User.find(
                query,
                select,
                options,
                function( err,docs ){
                    if( err )
                        reject( err );
                    resolve( docs );
                }
            )
        }
    ).catch(
        e => {
            console.error( e );
            return e;
        }
    )
}

const methods = {
    create_user,
    find_users,
}

module.exports = {
    model:User,
    methods
}
