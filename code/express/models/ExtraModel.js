const mongoose = require('mongoose');

const {connection,autoIncrement} = config( 'mongoose' );

const collectionName = 'extras';

const {Schema} = mongoose;

const extraSchema = new Schema(
    {
        price:      {type:Number,required:true},
        available:  {type:Number,required:true},
        name:       {type:String,required:true,unique:true}
    },
    {
        timestamps:true
    }
)

extraSchema.plugin( autoIncrement.plugin,'Extra' )

const Extra = connection.model( 'Extra',extraSchema,collectionName );

module.exports = Extra;
