const mongoose = require('mongoose');

const {connection} = config( 'mongoose' );

const expiredTokenSchema = new mongoose.Schema({
    token:{type:String,required:true}
});

module.exports = connection.model( 'ExpiredTokenModel',expiredTokenSchema,'expiredTokens' );
