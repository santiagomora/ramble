const jwt = require('jsonwebtoken')

module.exports = function(req,res,next)
{
    let token,authorization;
    if ( authorization = req.headers.authorization )
    {
        [,token] = authorization.split(' ')
        try
        {
            if ( jwt.verify(token,config('jwt.appSecret')) )
            {
                return next();
            }
        } 
        catch(err)
        {
            return res.status(200).json({unauthorized:"Unauthorized, invalid token..."})
        }
    }
    return res.status(200).json({unauthorized:"Unauthorized..."})
}