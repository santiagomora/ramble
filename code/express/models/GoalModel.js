const mongoose = require('mongoose');

const {connection,autoIncrement} = config( 'mongoose' );

const collectionName = 'goals';

const {Schema} = mongoose;

/*
bookSchema.plugin(autoIncrement.plugin, {
    model: 'Book',
    field: 'bookId',
    startAt: 100,
    incrementBy: 100
});*/

const goalSchema = new Schema(
    {
        userId      :{type: Number,ref:"User",required:true},
        title       :{type:String,required:true},
        description :{type:String,required:true}
        //get: ( date ) => date ? ( new Date( date ) ).toDateString() : undefined
    },{
        timestamps:true
    }
);

goalSchema.plugin(autoIncrement.plugin,'Goal')

const Goal = connection.model( 'User',goalSchema,collectionName );

module.exports = Goal;
