const mongoose = require('mongoose');

const {connection,autoIncrement} = config( 'mongoose' );

const collectionName = 'users';

const {Schema} = mongoose;

const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

/*
bookSchema.plugin(autoIncrement.plugin, {
    model: 'Book',
    field: 'bookId',
    startAt: 100,
    incrementBy: 100
});*/

const userSchema = new Schema(
    {
        name        :{type:String,required:true},
        email       :{type:String,required:true,unique: true},
        password    :{type:String,required: true},
        createdAt   :{type:Date,required:true},
        updatedAt   :{type:Date,required:true}
    },{
        timestamp:true
    }
);

userSchema.plugin(autoIncrement.plugin,'User')

userSchema.pre(
    'save', 
    function(next) 
    {
        const user = this;

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password'))
            return next();

        // generate a salt
        bcrypt.genSalt(
            SALT_WORK_FACTOR, 
            function(err, salt) 
            {
                if (err)
                    return next(err);
                bcrypt.hash(
                    user.password, 
                    salt, 
                    function(err, hash) 
                    {
                        if (err)
                            return next(err);
                        // override the cleartext password with the hashed one
                        user.password = hash;
                        next();
                    }
                );
            }
        );
    }
);

userSchema.methods.comparePassword = function(candidatePassword) 
{
    return new Promise(
        (res,rej) => 
        {
            bcrypt.compare(
                candidatePassword, 
                this.password, 
                function(err, isMatch) 
                {
                    if (err)
                        rej(err);
                    res(isMatch);
                }
            );
        }
    )
};

const User = connection.model( 'User',userSchema,collectionName );

module.exports = User;
