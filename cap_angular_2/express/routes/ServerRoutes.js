
const express = require('express');

const {authMiddleware} = require( config('path.middleware') )

const {toggleServer,indexServers,addNewServer} = require( config('path.controllers') ).serverController;

const router = express.Router();

router.post("/add",authMiddleware,addNewServer);

router.get("/",authMiddleware,indexServers);

router.put("/toggle/:_id",authMiddleware,toggleServer);

module.exports = router;