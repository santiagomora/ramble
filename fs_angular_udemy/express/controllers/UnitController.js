const { buildResponse } = require( config('path.helper') );

function UnitController( UnitQueries )
{
    this.indexUnits = async function( req,res )
    {
        const {type} = req.params;

        const data = await UnitQueries.getUnits({type,userId:req.user._id},req.query);
        const response = (data.error)
            ? buildResponse.error(400,`An error occurred when indexing units.`,"inComponent",data.error)
            : buildResponse.info(200,"Units indexed successfully.","noDisplay",data)
        return res.status(response.code).json(response.description)
    }
    
    this.deleteOneUnit = async function( req,res )
    {
        const {_id} = req.params

        const data = await UnitQueries.deleteUnit({_id,userId:req.user._id},req.body);
        const response = data.error 
            ? buildResponse.error(400,`An error has occurred when deleting unit`,"topLeftCorner",data.error)
            : buildResponse.info(200,`Unit deleted successfully.`,"topLeftCorner",data)
        return res.status(response.code).json(response.description)
    }
    
    this.addNewUnit = async function( req,res )
    {

        const data = await UnitQueries.addUnit({...req.body,userId:req.user._id});
        console.log(data)
        const response = (data.error)
            ? buildResponse.error(400,'An error occurred when creating the Unit.',"inComponent",data.error)
            : buildResponse.info(200,"Unit created succesfully","topLeftCorner",data)
        return res.status(response.code).json(response.description)
    }
    
    this.editUnit = async function( req,res )
    {
        const query = {_id:req.params._id||null,userId:req.user._id}

        const data = await UnitQueries.updateExistingUnit(query,req.body);
        const response = data.error 
            ? buildResponse.error(400,`An error has occurred when editing unit`,"inComponent",data.error)
            : buildResponse.success(200,`Unit edited successfully.`,"topLeftCorner",data)
        return res.status(response.code).json(response.description)
    }
    
    this.getUnit = async function( req,res )
    {
        const {_id} = req.params

        const data = await UnitQueries.getSingleUnit({_id,userId:req.user._id});
        const response = (data.error) 
            ? buildResponse.error(400,`An error has occurred querying unit with id ${_id}.`,"inHeader",data.error)
            : buildResponse.success(200,`Unit ${_id} found","topLeftCorner`,'noDisplay',data)
        return res.status(response.code).json(response.description)
    }
}

module.exports = UnitController