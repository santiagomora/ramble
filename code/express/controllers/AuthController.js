const {
    getSingleUser
} = require( config('path.queries') ).authQueries;

const jwt = require('jsonwebtoken')

const castUser = (user) => ({name:user.name,email:user.email,})

async function login( req,res )
{
    let checkPassword,jwtToken
    const {email,password} = req.body
    const [user] = await getSingleUser({email})
    if(user)
    {
        if( checkPassword = await user.comparePassword(password) ) 
        {
            jwtToken = jwt.sign(
                {name:user.name,email:user.email}, 
                config('jwt.appSecret'), 
                { expiresIn: '1800s' }
            );
            return res.status(200).json({success:{jwtToken,user:castUser(user)}})
        }
        return res.status(200).json({error:"Wrong password"})
    }
    return res.status(200).json({error:"User not found"})
}

async function logout( req,res )
{

} 

module.exports = {login,logout}
