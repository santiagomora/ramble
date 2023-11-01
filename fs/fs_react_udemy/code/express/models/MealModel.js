const mongoose = require('mongoose');

const {connection,autoIncrement} = config( 'mongoose' );

const collectionName = 'meals';

const {Schema} = mongoose;

const mealSchema = new Schema(
    {
        name:           {type:String,required:true},
        pic:            {type:String,required:true},
        price:          {type:Number,required:true},
        userId:         {type:Number,ref:"User",required:true},
        description:    {type:String,required:true},
        available:      {type:Number,required:true},
        category:       {type:Number,ref:"Category",required:true}
    },
    {
        timestamps:true
    }
)

mealSchema.plugin( autoIncrement.plugin,'Meal' )

const Meal = connection.model( 'Meal',mealSchema,collectionName );

module.exports = Meal;
