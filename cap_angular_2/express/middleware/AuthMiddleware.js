const jwt = require('jsonwebtoken')
const {checkTokenExpired,addExpiredtoken} = require(config('path.queries')).authQueries
const {buildResponse} = require(config('path.helper'))

module.exports = async function(req,res,next)
{
    let token,authorization,payload,response;
    try
    {
        if ( !( authorization = req.headers.authorization ) ) throw "";
        [,token] = authorization.split(' ')
        if ( !(payload = jwt.verify(token,config('jwt.appSecret'))) ) throw "";
        if( ( await checkTokenExpired({token}) ).length >0) throw "";
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