const mongoose = require('mongoose');

const auto_increment = require('mongoose-auto-increment');

const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_URI,
    DB_PORT,
    DB_URL
} = process.env;

const auto_increment_config = {
    startAt:0,
    incrementBy:1
};

const mongoose_config = {
    db_uri: DB_URI.replace( '<user>',DB_USER ) //user
        .replace( '<password>',DB_PASSWORD ) //password
        .replace( '<host>',DB_HOST ) //host
        .replace( '<dbname>',DB_NAME ) //db name
        .replace( ':<port>',DB_PORT ), //port
    options:{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:true
    }
}

function mongoose_connect(){
    const {options,db_uri} = mongoose_config;
    let connection;
    try{
        connection = mongoose.createConnection( db_uri,options );
        auto_increment.initialize( connection );
    } catch( e ){
        console.error(e);
    }
    return connection;
}

const connection = mongoose_connect();

module.exports = {
    auto_increment,
    auto_increment_config,
    connection
};
