const mongoose = require('mongoose');

const {connection} = config( 'mongoose' );

const logSchema = new mongoose.Schema(
    {
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
        description:{type:String,required:true},
        type:{type:String,required:true}
    },{
        timestamps:true
    }
);

module.exports = connection.model( 'Log',logSchema,'logs' );
