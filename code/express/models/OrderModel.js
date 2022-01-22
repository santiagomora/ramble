const mongoose = require('mongoose');

const {connection,autoIncrement} = config( 'mongoose' );

const collectionName = 'orders';

const {Schema} = mongoose;

const orderSchema = new Schema(
    {
        name:{type:String,required:true},

        address:{type:String,required:true},

        email:{type:String,required:true},

        phone:{type:String,required:true},

        observations:{type:String},

        total:{type:Number,required:true},

        items:[{
            _id:{type:Number,required:true,ref:'Meal'},
            quantity:{type:Number,required:true},
            total:{type:Number,required:true},
            extras:[{type:Number,ref:'Extra'}]
        }]
    },
    {
        timestamps:true
    }
)

orderSchema.plugin( autoIncrement.plugin,'Order' )

const Order = connection.model( 'Order',orderSchema,collectionName );

module.exports = Order;
