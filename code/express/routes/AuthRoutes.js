
const express = require('express');

const {authMiddleware} = require( config('path.middleware') )

const {login,logout} = require( config('path.controllers') ).authController;

const router = express.Router();

router.post( "/login",login );

router.get("/logout",authMiddleware,logout)

module.exports = router;
