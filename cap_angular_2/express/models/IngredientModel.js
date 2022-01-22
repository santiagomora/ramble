const mongoose = require('mongoose');

const {connection} = config( 'mongoose' );

const ingredientSchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true}
});

module.exports = connection.model( 'Ingredient',ingredientSchema,'ingredients' );
