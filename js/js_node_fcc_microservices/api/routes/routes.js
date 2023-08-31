const express = require( 'express' );

const cors = require( 'cors' );

const body_parser = require( 'body-parser' );

const time_routes = require( './date' );

const header_routes = require( './header' );

const url_routes = require( './url' );

const user_routes = require( './user' );

const file_routes = require( './file' );

const router = express.Router();

const base_uri = config( 'api.base_uri' );

const CORS_OPTIONS = config( 'cors.options' );

router.use( body_parser.urlencoded( { extended:false } ) );//body_parser.json() );

router.use( cors( CORS_OPTIONS ) );

router.use( '/',express.static( `${config('path.build')}` ) );

router.use( `${base_uri}/timestamp`,time_routes );

router.use( `${base_uri}/whoami`,header_routes );

router.use( `${base_uri}/shorturl`,url_routes );

router.use( `${base_uri}/exercise`,user_routes );

router.use( `${base_uri}/fileanalyse`,file_routes );

module.exports = router;
