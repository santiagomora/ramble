const mongoose = require('mongoose');

const {connection} = config( 'mongoose' );

const  orderSchema = new mongoose.Schema(
    {
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
        items:[{
            item:{type:mongoose.Schema.Types.ObjectId,ref:'Item',required:true},
            quantity: Number
        }]
    },{
        timestamps:true
    }
);

module.exports = connection.model( 'Order',orderSchema,'orders' );
