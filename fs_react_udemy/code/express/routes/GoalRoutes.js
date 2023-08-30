const express = require('express');

const {authMiddleware} = require( config('path.middleware') )

const {indexGoals,addNewGoal,updateExistingGoal} = require( config('path.controllers') ).goalController;

const router = express.Router();

router.get( "/:userId", authMiddleware,indexGoals );

router.post( "/add", authMiddleware,addNewGoal );

router.put( "/edit", authMiddleware,updateExistingGoal );

module.exports = router;
