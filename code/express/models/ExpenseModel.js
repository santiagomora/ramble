const mongoose = require('mongoose');

const {connection,autoIncrement} = config( 'mongoose' );

const collectionName = 'expenses';

const {Schema} = mongoose;

const expenseSchema = new Schema(
    {
        userId      :{type: Number,ref:"User",required:true},
        description :{type:String,required:true},
        title       :{type:String,required:true},
        amount      :{type:Number,required:true},
        date        :{type:Date,required:true}
    },{
        timestamps:true
    }
);

expenseSchema.plugin( autoIncrement.plugin,'Expense' )

const Expense = connection.model( 'Expense',expenseSchema,collectionName );

module.exports = Expense;
