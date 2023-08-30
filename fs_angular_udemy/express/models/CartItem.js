const mongoose = require('mongoose');

const {connection} = config( 'mongoose' );

const  cartItemSchema = new mongoose.Schema(
    {
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
        name:{type:String,required:true},
        brand:{type:String,required:true},
        description:{type:String,required:true},
        price:{type:Number,required:true},
        unit:{type:mongoose.Schema.Types.ObjectId,ref:'Unit',required:true}
    },{
        timestamps:true
    }
);

cartItemSchema.index(
    {name: 1,brand:1},
    {unique:true}
);

module.exports = connection.model( 'CartItem',cartItemSchema,'cartItems' );
