
const express = require('express');

const {authMiddleware} = require( config('path.middleware') )

const {indexLogs,addNewLog} = require( config('path.controllers') ).logController;

const router = express.Router();

router.post("/add",authMiddleware,addNewLog);

router.get("/:type",authMiddleware,indexLogs);

module.exports = router;
