
const express = require('express');

const {authMiddleware} = require( config('path.middleware') )

const {login,logout,register} = require( config('path.controllers') ).authController;

const router = express.Router();

router.post("/login",login );

router.get("/logout",authMiddleware,logout)

router.post("/register",register)

module.exports = router;
