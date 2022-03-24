const express = require( 'express' );

const {cors,applyformat} = require('./middleware/index');

const {history,search} = require('./controllers/index');

const router = express.Router();

router.use(cors);

router.get( '/local',search.local );

router.get( '/extern',search.extern,applyformat( 'externsearch' ) );

router.get( '/recent',history.recent );

module.exports = router;
