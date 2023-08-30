
const express = require('express');

const {authMiddleware} = require( config('path.middleware') )

const {indexExpenses,addNewExpense,updateExistingExpense} = require( config('path.controllers') ).expenseController;

const router = express.Router();

router.get( "/:userId", authMiddleware,indexExpenses );

router.post( "/add", authMiddleware,addNewExpense )

router.put( "/edit",authMiddleware,updateExistingExpense )

module.exports = router;
