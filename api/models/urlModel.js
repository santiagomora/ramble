const mongoose = require('mongoose');

const {
    auto_increment,
    auto_increment_config,
    connection
} = config( 'mongoose' );

const collection_name = 'short_urls';

const {Schema} = mongoose;

const url_schema = new Schema(
    {
        url_name:{
            type:String,
            required:true,
            lowercase:true,
            index:{
                unique:true
            },
            alias:"url"
        }
    },{
        timestamps:{
            createdAt:'url_created_at',
            updatedAt:'url_updated_at'
        }
    }
);

url_schema.plugin( auto_increment.plugin,{
    ...auto_increment_config,
    model:'Url',
    field:'url_id'
});

const Url = connection.model( 'Url',url_schema,'short_urls' );

function create_url({
    url_name
}){
    return new Promise(
        (resolve,reject) => {
            Url.create( {url_name}, function ( err,doc ){
                if ( err )
                    throw err;
                resolve(doc);
            });
        }
    ).catch( e => console.error(e) );
}

function find_one_url(find){
    return new Promise(
        (resolve,reject) => {
            Url.findOne( find, function ( err,doc ){
                if ( err )
                    throw err;
                resolve(doc);
            });
        }
    ).catch( e => console.error(e) );
}

function format_response_url({
    url_name,
    url_id
}){
    return ({
        original_url:url_name,
        short_url:url_id
    })
}

const methods = {
    find_one_url,
    create_url
}

const format = {
    format_response_url
}

module.exports = {
    model:Url,
    methods,
    format
}
