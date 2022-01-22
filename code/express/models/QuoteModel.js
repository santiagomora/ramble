const mongoose = require('mongoose');

const {connection,autoIncrement} = config( 'mongoose' );

const collectionName = 'quotes';

const {Schema} = mongoose;

const quoteSchema = new Schema(
    {
        author:{type:String,required:true,unique:true},
        userId:{type: Number, ref: "User",required:true},
        title:{type:String,required:true},
        text:{type:String,required:true}
    },
    {
        timestamps:true
    }
);

quoteSchema.index({ author: 1,title:1, userId: 1 }, { unique: true });

quoteSchema.plugin( autoIncrement.plugin,'Quote' )

const Quote = connection.model( 'Quote',quoteSchema,collectionName );

module.exports = Quote;
