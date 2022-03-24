require('dotenv').config();

global.config = require('./config/config');

const express = require('express');

const router = require( config( 'path.routes' ) );

const app = express();

const PORT = config('app.port');

const FALLBACK_PORT = config('app.fallback_port');

const mongoose_connection = config( 'mongoose.connection' );

app.use('/',router);

app.listen(
    process.env.PORT||8000,
    //APP_URL,
    function(){
        console.log(`App is listening on ${PORT}`)
    }
);
