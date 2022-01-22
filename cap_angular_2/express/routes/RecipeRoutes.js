const express = require('express');

const {authMiddleware} = require( config('path.middleware') )

const {
    getRecipe,
    addNewRecipe,
    formData,
    indexRecipes,
    editRecipe,
    deleteRecipe
} = require( config('path.controllers') ).recipeController;

const router = express.Router();

router.post("/add",authMiddleware,addNewRecipe );

router.get("/form",authMiddleware,formData);

router.put("/edit",authMiddleware,editRecipe);

router.get("/:_id",authMiddleware,getRecipe)

router.delete("/:_id",authMiddleware,deleteRecipe)

router.get("/",authMiddleware,indexRecipes);

module.exports = router;
