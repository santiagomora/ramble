const express = require( 'express' );

const cors = require( 'cors' );

const bodyParser = require( 'body-parser' );

const expenseRoutes = require( './ExpenseRoutes' )

const goalRoutes = require( './GoalRoutes' )

const foodRoutes = require('./FoodRoutes')

const quoteRoutes = require('./QuoteRoutes')

const authRoutes = require('./AuthRoutes')

const router = express.Router();

const CORS_OPTIONS = config( 'cors.options' );

router.use( bodyParser.json() );

router.use( cors( CORS_OPTIONS ) );

router.use( '/',express.static( `${config('path.build')}` ) );

router.use( `/goals`,goalRoutes );

router.use( `/expenses`,expenseRoutes );

router.use( '/menu',foodRoutes );

router.use( '/quote',quoteRoutes );

router.use( '/auth',authRoutes )

module.exports = router;
