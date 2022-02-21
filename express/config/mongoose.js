const mongoose = require('mongoose');

const mongooseConfig = {
    dbUri: process.env.DB_URI, //port
    options:{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:true
    }
}

function mongooseConnect(){
    const {options,dbUri} = mongooseConfig;
    let connection;
    try{
        connection = mongoose.createConnection( dbUri,options );
    } catch( e ){
        console.error(e);
    }
    return connection;
}

const connection = mongooseConnect();

module.exports = {
    connection
};
