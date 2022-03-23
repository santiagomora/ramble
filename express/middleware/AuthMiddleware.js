const jwt = require('jsonwebtoken')

const {buildResponse} = require(config('path.helper'))

const AuthQueries = require(config('path.queries')).authQueries

function AuthMiddleware( AuthQueries )
{
    return async function(req,res,next)
    {
        let token,authorization,payload,response;
        try
        {
            if ( !( authorization = req.headers.authorization ) ) throw "";
            [,token] = authorization.split(' ')
            if ( !(payload = jwt.verify(token,config('jwt.appSecret'))) ) throw "";
            if( ( await AuthQueries.checkTokenExpired({token}) ).length >0) throw "";
            req.token = token;
            req.user = payload;
            return next();
        } 
        catch(err)
        {
            response = buildResponse.error(403,"'Unauthorized, expired, missing or invalid token.'","topLeftCorner")
            return res.status(response.code).json(response.description)
        }
    }
}

module.exports = new AuthMiddleware( AuthQueries )