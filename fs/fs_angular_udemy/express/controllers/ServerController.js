const {buildResponse} = require( config('path.helper') )

function ServerController( ServerQueries )
{
    this.indexServers = async function( req,res )
    {
        const enabled = req.query.enabled==='true';
        const data = await ServerQueries.getServers({enabled,userId:req.user._id},req.query);
        const response = data.error 
            ? buildResponse.error(400,`An error has occurred when indexing servers.`,"inHeader",data.error)
            : buildResponse.success(200,`Servers indexed successfully`,"noDisplay",data)
        return res.status(response.code).json(response.description)
    }
    
    this.addNewServer = async function( req,res )
    {
        const data = await ServerQueries.addServer({...req.body,userId:req.user._id});
        const response = data.error 
            ? buildResponse.error(400,`An error has occurred when creating the server.`,"inComponent",data.error)
            : buildResponse.success(200,`Server created successfully.`,"topLeftCorner",data)
        return res.status(response.code).json(response.description)
    }
    
    this.updateSingleServer = async function( req,res )
    {
        const {_id} = req.params;
        const {enabled} = req.body;
        const data = await ServerQueries.updateServer({_id,userId:req.user._id},{enabled});
        const response = data.error 
            ? buildResponse.error(400,`An error has occurred when toggling the server.`,"inHeader",data.error)
            : buildResponse.success(200,`Server toggled successfully.`,"topLeftCorner",data)
        return res.status(response.code).json(response.description)
    }
    
    this.deleteSingleServer = async function( req,res )
    {
        const {_id} = req.params;
        const {enabled} = req.body;
        const data = await ServerQueries.updateServer({_id,userId:req.user._id},{enabled});
        const response = data.error 
            ? buildResponse.error(400,`An error has occurred deleting the server.`,"inHeader",data.error)
            : buildResponse.success(200,`Server deleted successfully.`,"topLeftCorner",data)
        return res.status(response.code).json(response.description)
    }
    
}

module.exports = ServerController
