const { buildResponse } = require( config('path.helper') );

const jwt = require('jsonwebtoken');

function AuthController( AuthQueries )
{
    const createToken = (user) => 
    {
        const payload = jwt.sign(
            {name:user.name,email:user.email,_id:user._id}, 
            config('jwt.appSecret'), 
            { expiresIn: config('jwt.tokenExpiration') }
        )
        const {iat,exp} = jwt.verify( payload,config('jwt.appSecret') );
        return {payload,...{iat,exp}}
    }

    const castUser = ({name,email,_id,photo,createdAt,updatedAt}) => 
    (
        {name,email,_id,photo,createdAt,updatedAt}
    )


    this.login = async function( req,res )
    {
        let checkPassword,response
        const {email,password} = req.body
        const [user] = await AuthQueries.getSingleUser({email})
        if(!user)
        {
            response = buildResponse.error(422,"Wrong user or password.","inComponent")
        }
        else if( !(checkPassword = await user.comparePassword(password)) ) 
        {
            response = buildResponse.error(422,"Wrong password.","inComponent")
        }
        else 
        {
            response = buildResponse.info(200,`Welcome back, ${user.name}`,"topLeftCorner",{user:castUser(user),token:createToken(user)})
        }
        return res.status(response.code).json(response.description)
    }

    this.logout = async function( req,res )
    {
        let response;
        const {token} = req
        if(!token)
        {
            response = buildResponse.error(401,'Missing token.',"topLeftCorner")
            return res.status(response.code).json(response.description)
        }
        const deleteToken = await AuthQueries.addExpiredtoken({token});
        response = deleteToken.error 
            ? buildResponse.error(400,"Error deleting token.","topLeftCorner",deleteToken.error)
            : buildResponse.info(200,"Logged out successfully.","topLeftCorner")
        return res.status(response.code).json(response.description)
    } 

    this.register = async function( req,res )
    {
        const data = await AuthQueries.registerUser(req.body);
        const response = (data.error)
            ? buildResponse.error(422,"An error occurred when creating the user.",data.error)
            : buildResponse.success(200,"User registered successfully.","inHeader",{
                token:createToken(data),
                user:castUser(data)
            })
        return res.status(response.code).json(response.description);
    } 
}

module.exports = AuthController
