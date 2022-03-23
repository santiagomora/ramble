require('dotenv').config();

global.config = require('./config/config');

const express = require('express');

const router = require( config( 'path.routes' ) );

const app = express();

//const FALLBACK_PORT = config('app.fallback_port');

const mongooseConnection = config( 'mongoose.connection' );

app.use('/',router);

app.listen(
    process.env.PORT||8000,
    function(){
        console.log(`App is listening on ${process.env.PORT}`)
    }
);
