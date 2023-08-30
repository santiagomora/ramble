const mongoose = require('mongoose');

const {connection,autoIncrement} = config( 'mongoose' );

const collectionName = 'comments';

const {Schema} = mongoose;

const commentSchema = new Schema(
    {
        author:{type:String,required:true},
        quoteId:{type:Number, ref: "Quote"},
        text:{type:String,required:true}
    },
    {
        timestamps:true
    }
);

commentSchema.plugin( autoIncrement.plugin,'QuoteComment' )

const QuoteComment = connection.model( 'QuoteComment',commentSchema,collectionName );

module.exports = QuoteComment;
