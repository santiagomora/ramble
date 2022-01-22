const express = require( 'express' );

const cors = require( 'cors' );

const logRoutes = require( './LogRoutes' )

const authRoutes = require('./AuthRoutes')

const serverRoutes = require('./ServerRoutes')

const recipeRoutes = require('./RecipeRoutes')

const router = express.Router();

const CORS_OPTIONS = config( 'cors.options' );

router.use( express.json() );

router.use( cors( CORS_OPTIONS ) );

//router.use( '/',express.static( `${config('path.build')}` ) );

router.use( '/',express.static( `${config('path.public')}` ) );

router.use( '/log',logRoutes );

router.use( '/auth',authRoutes );

router.use( '/server',serverRoutes );

router.use('/recipe',recipeRoutes);

module.exports = router;
