const mongoose = require('mongoose');

const {connection} = config( 'mongoose' );

const serverSchema = new mongoose.Schema(
    {
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
        name:{type:String,required:true},
        enabled:{type:Boolean,required:true}
    },{
        timestamps:true
    }
);

module.exports = connection.model( 'Server',serverSchema,'servers' );