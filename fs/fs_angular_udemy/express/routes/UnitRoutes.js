const express = require('express');

const AuthMiddleware = require( config('path.middleware') ).authMiddleware

const UnitQueries = require( config('path.queries') ).unitQueries

const UnitController = require( config('path.controllers') ).unitController;

const controller = new UnitController( UnitQueries )

const router = express.Router();

router.get("/",AuthMiddleware,controller.indexUnits);

router.delete("/:_id",AuthMiddleware,controller.deleteOneUnit);

router.post("/",AuthMiddleware,controller.addNewUnit);

router.put("/:_id",AuthMiddleware,controller.editUnit);

router.get("/:_id",AuthMiddleware,controller.getUnit);

module.exports = router;
