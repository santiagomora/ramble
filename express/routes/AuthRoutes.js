
const express = require('express');

const AuthMiddleware = require( config('path.middleware') ).authMiddleware

const AuthController = require(config('path.controllers')).authController

const AuthQueries = require( config('path.queries') ).authQueries;

const router = express.Router();

const controller = new AuthController( AuthQueries )

router.post("/login",controller.login );

router.get("/logout",AuthMiddleware,controller.logout)

router.post("/register",controller.register)

module.exports = router;
