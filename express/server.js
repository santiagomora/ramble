require('dotenv').config();

global.config = require('./config/config');

const dbConnection = config('mongoose.connection')

const express = require('express');

const router = require( config( 'path.routes' ) );

const app = express();

app.use('/api',router);

app.listen(
    process.env.PORT||8000,
    function(){
        console.log(`App is listening on ${process.env.PORT}`)
    }
);
