const { buildResponse } = require( config('path.helper') );

function LogController( LogQueries )
{
    this.indexLogs=async function( req,res )
    {
        const {type} = req.params;
        const data = await LogQueries.getLogs({type,userId:req.user._id},req.query);
        const response = (data.error)
            ? buildResponse.error(400,`An error occurred when indexing ${type} logs.`,"inComponent",data.error)
            : buildResponse.info(200,"Logs indexed successfully.","noDisplay",data)
        return res.status(response.code).json(response.description)
    }
    
    this.addNewLog=async function( req,res )
    {
        const data = await LogQueries.addLog({...req.body,userId:req.user._id});
        const response = (data.error)
            ? buildResponse.error(400,'An error occurred when creating the Log.',"inComponent",data.error)
            : buildResponse.info(200,"Log created succesfully","topLeftCorner",data)
        return res.status(response.code).json(response.description)
    }
}

module.exports = LogController
