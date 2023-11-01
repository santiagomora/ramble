const express = require('express');

const AuthMiddleware = require( config('path.middleware') ).authMiddleware

const CartItemQueries = require( config('path.queries') ).cartItemQueries

const CartItemController = require( config('path.controllers') ).cartItemController;

const controller = new CartItemController( CartItemQueries )

const router = express.Router();

router.get("/",AuthMiddleware,controller.indexCartItems);

router.get("/form",AuthMiddleware,controller.getCartItemFormData);

router.get("/:_id",AuthMiddleware,controller.getCartItem);

router.delete("/:_id",AuthMiddleware,controller.deleteOneCartItem);

router.post("/",AuthMiddleware,controller.addNewCartItem);

router.put("/:_id",AuthMiddleware,controller.editCartItem);

module.exports = router;
