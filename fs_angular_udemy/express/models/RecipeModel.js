const mongoose = require('mongoose');

const {connection} = config( 'mongoose' );

const recipeSchema = new mongoose.Schema(
    {
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
        name:{type:String,required:true},
        description:{type:String,required:true},
        ingredients:[{
            item:{type: mongoose.Schema.Types.ObjectId,ref:'CartItem'},
            quantity:{type:Number,required:true}
        }]
    },{
        timestamps:true
    }
);

module.exports = connection.model( 'Recipe',recipeSchema,'recipes' );