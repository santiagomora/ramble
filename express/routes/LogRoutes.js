
const express = require('express');

const AuthMiddleware = require( config('path.middleware') ).authMiddleware

const LogQueries = require( config('path.queries') ).logQueries

const LogController = require( config('path.controllers') ).logController;

const controller = new LogController( LogQueries )

const router = express.Router();

router.post("/add",AuthMiddleware,controller.addNewLog);

router.get("/:type",AuthMiddleware,controller.indexLogs);

module.exports = router;
