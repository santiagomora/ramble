const { buildResponse } = require( config('path.helper') );

function OrderController( OrderQueries )
{
    this.indexOrders = async function( req,res )
    {
        const data = await OrderQueries.getOrders({userId:req.user._id},req.query);
        const response = (data.error)
            ? buildResponse.error(400,`An error occurred when indexing orders.`,"inComponent",data.error)
            : buildResponse.info(200,"Orders indexed successfully.","noDisplay",data)
        return res.status(response.code).json(response.description)
    }
    
    this.addNewOrder = async function( req,res )
    {
        const data = await OrderQueries.addOrder({...req.body,userId:req.user._id});
        const response = (data.error)
            ? buildResponse.error(400,'An error occurred when creating the order.',"inComponent",data.error)
            : buildResponse.info(200,"Order created succesfully","topLeftCorner",data)
        return res.status(response.code).json(response.description)
    }
    
    this.deleteOneOrder = async function( req,res )
    {
        const {_id} = req.params
        const data = await OrderQueries.deleteOrder({_id,userId:req.user._id},req.body);
        const response = data.error 
            ? buildResponse.error(400,`An error has occurred when deleting order`,"topLeftCorner",data.error)
            : buildResponse.info(200,`Order deleted successfully.`,"topLeftCorner",data)
        return res.status(response.code).json(response.description)
    }
    
    this.getOrder = async function( req,res ) 
    {
        const {_id} = req.params
        const data = await OrderQueries.getSingleOrder({_id,userId:req.user._id});
        const response = (data.error) 
            ? buildResponse.error(400,`An error has occurred querying order with id ${_id}.`,"inHeader",data.error)
            : buildResponse.success(200,`Order ${_id} found`,'noDisplay',data)
        return res.status(response.code).json(response.description)
    }

}

module.exports = OrderController