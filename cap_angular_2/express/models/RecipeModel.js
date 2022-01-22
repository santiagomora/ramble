const mongoose = require('mongoose');

const {connection} = config( 'mongoose' );

const recipeSchema = new mongoose.Schema(
    {
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
        name:{type:String,required:true},
        description:{type:String,required:true},
        ingredients:[{
            ingredient:{type: mongoose.Schema.Types.ObjectId,ref:'Ingredient'},
            quantity:{type:Number,required:true},
            unit:{type: mongoose.Schema.Types.ObjectId,ref:'Unit'}
        }]
    },{
        timestamps:true
    }
);

module.exports = connection.model( 'Recipe',recipeSchema,'recipes' );