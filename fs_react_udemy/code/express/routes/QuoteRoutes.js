const express = require('express');

const {authMiddleware} = require( config('path.middleware') )

const {indexQuotes,addNewQuote,addNewQuoteComment,indexQuoteComments,viewSingleQuote} = require( config('path.controllers') ).quoteController;

const router = express.Router();

router.get( "/:userId(\\d+)", authMiddleware,indexQuotes );

router.get( "/single/:quoteId(\\d+)", authMiddleware,viewSingleQuote );

router.get( "/comment/:quoteId(\\d+)", authMiddleware,indexQuoteComments );

router.post( "/add", authMiddleware,addNewQuote );

router.post( "/comment/add", authMiddleware, addNewQuoteComment );

module.exports = router;
