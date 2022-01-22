const mongoose = require('mongoose');

const {connection} = config( 'mongoose' );

const unitSchema = new mongoose.Schema({
    name:{type:String,required:true},
    type:{type:String,required:true}
});

unitSchema.index(
    {name: 1,type:1},
    {unique:true}
);

module.exports = connection.model( 'Unit',unitSchema,'units' );
