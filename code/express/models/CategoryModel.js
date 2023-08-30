const mongoose = require('mongoose');

const {connection,autoIncrement} = config( 'mongoose' );

const collectionName = 'categories';

const {Schema} = mongoose;

const categorySchema = new Schema(
    {
        extras: [{type: Number, ref: "Extras"}],
        userId: {type: Number,ref:"User",required:true},
        name:   {type:String,required:true,unique:true}
    },
    {
        timestamps:true
    }
);

categorySchema.index({ name: 1, userId: 1 }, { unique: true });

categorySchema.plugin( autoIncrement.plugin,'Category' )

const Category = connection.model( 'Category',categorySchema,collectionName );

module.exports = Category;
