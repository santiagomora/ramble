const express = require( 'express' );

const cors = require( 'cors' );

const logRoutes = require( './LogRoutes' )

const authRoutes = require('./AuthRoutes')

const serverRoutes = require('./ServerRoutes')

const recipeRoutes = require('./RecipeRoutes')

const cartItemRoutes = require('./CartItemRoutes')

const unitRoutes = require('./UnitRoutes')

const orderRoutes = require('./OrderRoutes')

const router = express.Router();

const CORS_OPTIONS = config('cors.options');

router.use( express.json() );

router.use( cors( CORS_OPTIONS ) );

//router.use( '/',express.static( `${config('path.build')}` ) );

router.use( '/',express.static( `${config('path.public')}` ) );

router.use( '/log',logRoutes );

router.use( '/auth',authRoutes );

router.use( '/server',serverRoutes );

router.use('/recipe',recipeRoutes);

router.use('/cart-item',cartItemRoutes);

router.use('/unit',unitRoutes);

router.use('/order',orderRoutes);

module.exports = router;
