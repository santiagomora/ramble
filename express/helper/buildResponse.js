function buildResponse( code,message,outlet = null,type = null,data = null )
{
    return {
        code,
        description:{
            message,
            outlet,
            type,
            data
        }
    }
}

module.exports = {
    error: (code,message,outlet,data = null) => buildResponse( code,message,outlet,"error",data ),
    info: (code,message,outlet,data = null) => buildResponse( code,message,outlet,"info",data ),
    success: (code,message,outlet,data = null) => buildResponse( code,message,outlet,"success",data ) 
}