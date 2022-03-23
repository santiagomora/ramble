
const express = require('express');

const AuthMiddleware = require( config('path.middleware') ).authMiddleware

const ServerQueries = require( config('path.queries') ).serverQueries

const ServerController = require( config('path.controllers') ).serverController;

const controller = new ServerController( ServerQueries )

const router = express.Router();

router.post("/add",AuthMiddleware,controller.addNewServer);

router.get("/",AuthMiddleware,controller.indexServers);

router.put("/:_id",AuthMiddleware,controller.updateSingleServer);

router.delete("/:_id",AuthMiddleware,controller.deleteSingleServer);

module.exports = router;