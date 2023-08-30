const express = require('express');

const AuthMiddleware = require( config('path.middleware') ).authMiddleware

const RecipeQueries = require( config('path.queries') ).recipeQueries

const RecipeController = require( config('path.controllers') ).recipeController;

const controller = new RecipeController( RecipeQueries )

const router = express.Router();

router.post("/add",AuthMiddleware,controller.addNewRecipe );

router.get("/form",AuthMiddleware,controller.formData);

router.put("/edit",AuthMiddleware,controller.editRecipe);

router.get("/:_id",AuthMiddleware,controller.getRecipe)

router.delete("/:_id",AuthMiddleware,controller.deleteRecipe)

router.get("/",AuthMiddleware,controller.indexRecipes);

module.exports = router;
