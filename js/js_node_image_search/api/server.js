const express = require( 'express' );

const http = require( 'http' );

const router = require( './router' );

const {API_PORT} = require( './config/env' );

const {db_connect} = require('./config/database');

const app = express();

const port = API_PORT || 5000;

app.use( '/api',router );

app.disable('etag');

db_connect().then(
    res => {
        app.listen(
            port,
            () => console.log(`API listening on port ${port}`)
        );
    }
);
