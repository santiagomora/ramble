const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const {connection} = config( 'mongoose' );

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true },
        email:{
            type:String,
            required:true,
            unique:true },
        password:{
            type:String,
            required: true },
        photo:{
            type:String }
    },
    {
        timestamps:true
    }
);

userSchema.pre(
    'save', 
    function(next) 
    {
        const user = this;

        if ( user.isNew )
        {
            user.photo = '/user.png'
        }

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password'))
        {
            return next();
        }

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

module.exports = connection.model( 'User',userSchema,'users' );
