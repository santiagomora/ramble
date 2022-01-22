
const express = require('express');

const {authMiddleware} = require( config('path.middleware') )

const {createOrder,indexMenu,indexCategories} = require( config('path.controllers') ).foodController;

const router = express.Router();

router.get( "/:userId(\\d+)/:category?", authMiddleware,indexMenu );

router.get( "/categories/:userId", authMiddleware,indexCategories );

router.post( "/order/add",authMiddleware,createOrder );

//router.get( "/:userId", createData );

module.exports = router;
