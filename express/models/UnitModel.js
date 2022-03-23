const mongoose = require('mongoose');

const {connection} = config( 'mongoose' );

const unitSchema = new mongoose.Schema(
    {
        longName:{type:String,required:true,unique:true},
        shortName:{type:String,required:true,unique:true},
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    },{
        timestamps:true
    }
);

/*unitSchema.index(
    {shortName: 1,longName:1},
    {unique:true}
);*/

module.exports = connection.model( 'Unit',unitSchema,'units' );
