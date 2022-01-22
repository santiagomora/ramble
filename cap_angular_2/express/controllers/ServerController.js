const {updateServer,addServer,getServers} = require( config('path.queries') ).serverQueries;

const {buildResponse} = require( config('path.helper') )

async function indexServers( req,res )
{
    const enabled = req.query.enabled==='true';
    const data = await getServers({enabled,userId:req.user._id},req.query);
    const response = data.error 
        ? buildResponse.error(400,`An error has occurred when indexing servers.`,"inHeader",data.error)
        : buildResponse.success(200,`Servers indexed successfully`,"noDisplay",data)
    return res.status(response.code).json(response.description)
}

async function addNewServer( req,res )
{
    const data = await addServer({...req.body,userId:req.user._id});
    const response = data.error 
        ? buildResponse.error(400,`An error has occurred when creating the server.`,"inComponent",data.error)
        : buildResponse.success(200,`Server created successfully.`,"topLeftCorner",data)
    return res.status(response.code).json(response.description)
}

async function toggleServer( req,res )
{
    const {_id} = req.params;
    const {enabled} = req.body;
    const data = await updateServer({_id,userId:req.user._id},{enabled});
    const response = data.error 
        ? buildResponse.error(400,`An error has occurred when toggling the server.`,"inHeader",data.error)
        : buildResponse.success(200,`Server toggled successfully.`,"topLeftCorner",data)
    return res.status(response.code).json(response.description)
}

module.exports = {
    indexServers,
    addNewServer,
    toggleServer
};
