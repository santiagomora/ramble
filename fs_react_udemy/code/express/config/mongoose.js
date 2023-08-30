const mongoose = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_URI,
    DB_PORT,
    DB_URL
} = process.env;

const autoIncrementConfig = {
    startAt:0,
    incrementBy:1
};

const mongooseConfig = {
    dbUri: DB_URI.replace( '<user>',DB_USER ) //user
        .replace( '<password>',DB_PASSWORD ) //password
        .replace( '<host>',DB_HOST ) //host
        .replace( '<dbname>',DB_NAME ) //db name
        .replace( '<port>',DB_PORT ), //port
    options:{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:true
    }
}

function mongoose_connect(){
    const {options,dbUri} = mongooseConfig;
    let connection;
    try{
        connection = mongoose.createConnection( dbUri,options );
        autoIncrement.initialize( connection );
    } catch( e ){
        console.error(e);
    }
    return connection;
}

const connection = mongoose_connect();

autoIncrement.initialize(connection);

module.exports = {
    autoIncrement,
    autoIncrementConfig,
    connection
};
