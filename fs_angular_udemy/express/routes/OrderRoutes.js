const express = require('express');

const AuthMiddleware = require( config('path.middleware') ).authMiddleware

const OrderQueries = require( config('path.queries') ).orderQueries

const OrderController = require( config('path.controllers') ).orderController;

const controller = new OrderController( OrderQueries )

const router = express.Router();

router.get("/",AuthMiddleware,controller.indexOrders);

router.get("/:_id",AuthMiddleware,controller.getOrder);

router.delete("/:_id",AuthMiddleware,controller.deleteOneOrder);

router.post("/",AuthMiddleware,controller.addNewOrder);

module.exports = router;
